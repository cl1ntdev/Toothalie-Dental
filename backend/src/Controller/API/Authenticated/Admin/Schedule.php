<?php

namespace App\Controller\API\Authenticated\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use App\Service\ActivityLogger;

class Schedule extends AbstractController
{
    private function denyUnlessAdmin(): ?JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return new JsonResponse([
                "status" => "error",
                "message" => "Unauthorized",
            ], 401);
        }

        if (!in_array("ROLE_ADMIN", $user->getRoles(), true)) {
            return new JsonResponse([
                "status" => "error",
                "message" => "Forbidden",
            ], 403);
        }

        return null;
    }

    #[
        Route(
            "/api/admin/get-schedules",
            name: "get-schedules",
            methods: ["GET"],
        ),
    ]
    public function getSchedules(Connection $connection): JsonResponse
    {
        try {
            $authError = $this->denyUnlessAdmin();
            if ($authError) {
                return $authError;
            }

            $schedules = $connection->fetchAllAssociative(
                'SELECT s.id, s.day_of_week, s.time_slot, s.dentistID,
                        u.first_name as dentist_first_name, u.last_name as dentist_last_name
                 FROM schedule s
                 JOIN user u ON s.dentistID = u.id',
            );

            return new JsonResponse([
                "schedules" => $schedules,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }

    #[Route("/api/admin/get-schedule", name: "get-schedule", methods: ["POST"])]
    public function getOneSchedule(
        Request $req,
        Connection $connection,
    ): JsonResponse {
        try {
            $authError = $this->denyUnlessAdmin();
            if ($authError) {
                return $authError;
            }

            $data = json_decode($req->getContent(), true);
            $scheduleID = $data["id"];

            $schedule = $connection->fetchAssociative(
                'SELECT s.id, s.day_of_week, s.time_slot, s.dentistID,
                        u.first_name as dentist_first_name, u.last_name as dentist_last_name
                 FROM schedule s
                 JOIN user u ON s.dentistID = u.id
                 WHERE s.id = ?',
                [$scheduleID],
            );

            return new JsonResponse([
                "schedule" => $schedule,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }

    #[
        Route(
            "/api/admin/delete-schedule",
            name: "delete-schedule",
            methods: ["POST"],
        ),
    ]
    public function deleteSchedule(
        Request $req,
        Connection $connection,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $authError = $this->denyUnlessAdmin();
            if ($authError) {
                return $authError;
            }

            $data = json_decode($req->getContent(), true);

            if (!isset($data["id"])) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Missing schedule ID",
                    ],
                    400,
                );
            }

            $scheduleID = $data["id"];

            $schedule = $connection->fetchAssociative(
                "SELECT * FROM schedule WHERE id = ?",
                [$scheduleID],
            );

            if (!$schedule) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Schedule not found",
                    ],
                    404,
                );
            }

            $connection->delete("schedule", ["id" => $scheduleID]);

            // Log deletion
            $logger->log(
                "SCHEDULE_DELETED",
                "Admin deleted schedule ID {$scheduleID} (Dentist ID: {$schedule["dentistID"]}, Day: {$schedule["day_of_week"]}, Time: {$schedule["time_slot"]})",
            );

            return new JsonResponse([
                "status" => "success",
                "message" => "Schedule deleted permanently",
                "schedule_id" => $scheduleID,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }

    public function updateSchedule(
        Request $req,
        Connection $connection,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $authError = $this->denyUnlessAdmin();
            if ($authError) {
                return $authError;
            }

            $data = json_decode($req->getContent(), true);

            if (!$data || !isset($data["id"])) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Missing schedule ID",
                    ],
                    400,
                );
            }

            $scheduleID = $data["id"];

            $originalSchedule = $connection->fetchAssociative(
                "SELECT * FROM schedule WHERE id = ?",
                [$scheduleID],
            );

            if (!$originalSchedule) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Schedule not found",
                    ],
                    404,
                );
            }

            $updateData = [
                "day_of_week" => $data["day_of_week"] ?? null,
                "time_slot" => $data["time_slot"] ?? null,
                "dentistID" => $data["dentistID"] ?? null,
            ];

            $updateData = array_filter($updateData, fn($v) => $v !== null);

            $changedFields = [];
            foreach ($updateData as $key => $newValue) {
                $oldValue = $originalSchedule[$key] ?? null;
                if ($oldValue != $newValue) {
                    $changedFields[] = "{$key} ('{$oldValue}' to '{$newValue}')";
                }
            }

            $connection->update("schedule", $updateData, ["id" => $scheduleID]);

            // Log update
            if (!empty($changedFields)) {
                $logger->log(
                    "SCHEDULE_UPDATED",
                    "Admin updated schedule ID {$scheduleID}. Changes: " .
                        implode("; ", $changedFields),
                );
            }

            return new JsonResponse(
                [
                    "status" => "success",
                    "message" => "Schedule updated successfully",
                    "updated" => $updateData,
                ],
                200,
            );
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }

    #[
        Route(
            "/api/admin/create-schedule",
            name: "create-schedule",
            methods: ["POST"],
        ),
    ]
    public function createSchedule(
        Request $req,
        Connection $connection,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $authError = $this->denyUnlessAdmin();
            if ($authError) {
                return $authError;
            }

            $data = json_decode($req->getContent(), true);

            $required = ["day_of_week", "time_slot", "dentistID"];
            foreach ($required as $field) {
                if (
                    empty($data[$field]) &&
                    $data[$field] !== 0 &&
                    $data[$field] !== "0"
                ) {
                    return new JsonResponse(
                        [
                            "status" => "error",
                            "message" => "Missing required field: $field",
                        ],
                        400,
                    );
                }
            }

            $insertData = [
                "day_of_week" => $data["day_of_week"],
                "time_slot" => $data["time_slot"],
                "dentistID" => $data["dentistID"],
            ];

            $connection->insert("schedule", $insertData);

            $newScheduleId = $connection->lastInsertId();

            // Log creation
            $logger->log(
                "SCHEDULE_CREATED",
                "Admin created schedule ID {$newScheduleId} (Dentist ID: {$data["dentistID"]}, Day: {$data["day_of_week"]}, Time: {$data["time_slot"]})",
            );

            return new JsonResponse([
                "status" => "success",
                "message" => "Schedule created successfully",
                "schedule_id" => $newScheduleId,
                "data" => $insertData,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => $e->getMessage(),
                ],
                500,
            );
        }
    }
}
