<?php

namespace App\Controller\API\Authenticated\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use App\Service\ActivityLogger;

final class AdminServiceController extends AbstractController
{
    public function __construct(private ActivityLogger $logger) {}

    #[
        Route(
            "/api/admin/services",
            methods: ["GET"],
            name: "admin_get_services",
        ),
    ]
    public function listServices(Connection $connection): JsonResponse
    {
        $data = $connection->fetchAllAssociative(
            "SELECT s.id as id, s.name as name, s.service_type_id, st.name as service_type_name
             FROM service s
             JOIN service_type st ON s.service_type_id = st.id",
        );

        return new JsonResponse(["status" => "ok", "data" => $data]);
    }

    #[
        Route(
            "/api/admin/create-service",
            methods: ["POST"],
            name: "admin_create_service",
        ),
    ]
    public function createService(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        $name = $payload["name"] ?? null;
        $serviceTypeId = $payload["service_type_id"] ?? null;

        if (!$name || !$serviceTypeId) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => "Missing name or service_type_id",
                ],
                400,
            );
        }

        $connection->executeStatement(
            "INSERT INTO service (name, service_type_id) VALUES (?, ?)",
            [$name, $serviceTypeId],
        );
        $newId = $connection->lastInsertId();
        $this->logger->log(
            "RECORD_CREATED",
            "Admin created service '{$name}' with ID {$newId}",
        );

        return new JsonResponse(["status" => "ok"]);
    }

    #[
        Route(
            "/api/admin/update-service",
            methods: ["POST"],
            name: "admin_update_service",
        ),
    ]
    public function updateService(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        $id = $payload["id"] ?? null;
        $name = $payload["name"] ?? null;
        $serviceTypeId = $payload["service_type_id"] ?? null;

        if (!$id || !$name || !$serviceTypeId) {
            return new JsonResponse(
                [
                    "status" => "error",
                    "message" => "Missing id, name or service_type_id",
                ],
                400,
            );
        }

        $connection->executeStatement(
            "UPDATE service SET name = ?, service_type_id = ? WHERE id = ?",
            [$name, $serviceTypeId, $id],
        );
        $this->logger->log(
            "RECORD_UPDATED",
            "Admin updated service ID {$id} to name '{$name}' and service type ID {$serviceTypeId}",
        );

        return new JsonResponse(["status" => "ok"]);
    }

    #[
        Route(
            "/api/admin/delete-service",
            methods: ["POST"],
            name: "admin_delete_service",
        ),
    ]
    public function deleteService(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $payload = json_decode($request->getContent(), true);
        $id = $payload["id"] ?? null;

        if (!$id) {
            return new JsonResponse(
                ["status" => "error", "message" => "Missing id"],
                400,
            );
        }

        $nameBeforeDelete = $connection->fetchOne(
            "SELECT name FROM service WHERE id = ?",
            [$id],
        );
        $connection->executeStatement("DELETE FROM service WHERE id = ?", [
            $id,
        ]);
        $this->logger->log(
            "RECORD_DELETED",
            "Admin deleted service '{$nameBeforeDelete}' (ID: {$id})",
        );

        return new JsonResponse(["status" => "ok"]);
    }
}
