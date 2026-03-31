<?php

namespace App\Controller\API\Authenticated\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Service\ActivityLogger;

class AppUser extends AbstractController
{
    #[Route("/api/admin/get-users", name: "get-users", methods: ["GET"])]
    public function getUsers(Request $req, Connection $connection): JsonResponse
    {
        try {
            $users = $connection->fetchAllAssociative("SELECT * from user");

            return new JsonResponse([
                "users" => $users,
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

    #[Route("/api/admin/get-user", name: "get-user", methods: ["POST"])]
    public function getOneUser(
        Request $req,
        Connection $connection,
    ): JsonResponse {
        try {
            $data = json_decode($req->getContent(), true);
            $userID = $data["userID"] ?? null;

            if (!$userID) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Missing user ID",
                    ],
                    400,
                );
            }

            $user = $connection->fetchAssociative(
                "SELECT * from user where id = ?",
                [$userID],
            );

            return new JsonResponse([
                "user" => $user,
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

    #[Route("/api/admin/delete-user", name: "delete-user", methods: ["POST"])]
    public function deleteUserHard(
        Request $req,
        Connection $connection,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $data = json_decode($req->getContent(), true);

            if (!isset($data["userID"])) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Missing user ID",
                    ],
                    400,
                );
            }

            $userID = $data["userID"];

            // Check user exists
            $user = $connection->fetchAssociative(
                "SELECT * FROM user WHERE id = ?",
                [$userID],
            );

            if (!$user) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "User not found",
                    ],
                    404,
                );
            }

            // Hard delete
            $connection->delete("user", ["id" => $userID]);

            // Log the deletion
            $logger->log(
                "USER_DELETED",
                "Admin deleted user ID {$userID} ({$user["username"]})",
            );

            return new JsonResponse([
                "status" => "success",
                "message" => "User deleted permanently",
                "user_id" => $userID,
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

    #[Route("/api/admin/update-user", name: "update-user", methods: ["POST"])]
    public function updateUser(
        Request $req,
        Connection $connection,
        UserPasswordHasherInterface $passwordHasher,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $data = json_decode($req->getContent(), true);

            if (!$data || !isset($data["userID"])) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Missing user ID",
                    ],
                    400,
                );
            }

            $userId = $data["userID"];

            // Fetch original data to diff
            $originalUser = $connection->fetchAssociative(
                "SELECT * FROM user WHERE id = ?",
                [$userId],
            );

            // Prepare update data. Use null for fields that should be left unchanged.
            $updateData = [
                "first_name" => $data["first_name"] ?? null,
                "last_name" => $data["last_name"] ?? null,
                "email" => $data["email"] ?? null,
                "username" => $data["username"] ?? null,
                "roles" => $data["roles"] ?? '["ROLE_USER"]',
                // Use null here so we only update disable/is_verified when the key is present in payload.
                "disable" => array_key_exists("is_disabled", $data)
                    ? (int) $data["is_disabled"]
                    : null,
                "is_verified" => array_key_exists("is_verified", $data)
                    ? (int) $data["is_verified"]
                    : null,
            ];

            // Handle password change (if provided)
            if (!empty($data["password"])) {
                // Keep using password_hash to be consistent with existing codebase
                $updateData["password"] = password_hash(
                    $data["password"],
                    PASSWORD_BCRYPT,
                );
            }

            // Remove NULL values so fields remain unchanged
            $updateData = array_filter($updateData, fn($v) => $v !== null);

            // Identify actual changes
            $changedFields = [];
            foreach ($updateData as $key => $newValue) {
                if ($key === "password") {
                    $changedFields[] = "password";
                    continue;
                }

                $oldValue = $originalUser[$key] ?? null;
                // strict cast string comparisons when checking for differences if needed,
                // but loose comparison works here since DB often returns string for ints
                if ($oldValue != $newValue) {
                    $changedFields[] = "{$key} ('{$oldValue}' to '{$newValue}')";
                }
            }

            // Update database
            $connection->update("user", $updateData, ["id" => $userId]);

            // Log the update, only if there were actual changes
            if (!empty($changedFields)) {
                $logger->log(
                    "USER_UPDATED",
                    "Admin updated user ID {$userId}. Changes: " .
                        implode("; ", $changedFields),
                );
            }

            return new JsonResponse(
                [
                    "status" => "success",
                    "message" => "User updated successfully",
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

    #[Route("/api/admin/create-user", name: "create-user", methods: ["POST"])]
    public function createUser(
        Request $req,
        Connection $connection,
        UserPasswordHasherInterface $passwordHasher,
        ActivityLogger $logger,
    ): JsonResponse {
        try {
            $data = json_decode($req->getContent(), true);

            // Validate required fields
            $required = [
                "first_name",
                "last_name",
                "email",
                "username",
                "password",
                "roles",
            ];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    return new JsonResponse(
                        [
                            "status" => "error",
                            "message" => "Missing required field: $field",
                        ],
                        400,
                    );
                }
            }

            // Check for duplicate email
            $existingEmail = $connection->fetchOne(
                "SELECT id FROM user WHERE email = ?",
                [$data["email"]],
            );

            if ($existingEmail) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Email already exists",
                    ],
                    409,
                );
            }

            // Check for duplicate username
            $existingUsername = $connection->fetchOne(
                "SELECT id FROM user WHERE username = ?",
                [$data["username"]],
            );

            if ($existingUsername) {
                return new JsonResponse(
                    [
                        "status" => "error",
                        "message" => "Username already exists",
                    ],
                    409,
                );
            }

            // Prepare insert data
            $insertData = [
                "first_name" => $data["first_name"],
                "last_name" => $data["last_name"],
                "email" => $data["email"],
                "username" => $data["username"],
                "password" => password_hash($data["password"], PASSWORD_BCRYPT),
                "roles" => $data["roles"], // already a JSON string
                "disable" => isset($data["disable"])
                    ? (int) $data["disable"]
                    : 0,
                "is_verified" => isset($data["is_verified"])
                    ? (int) $data["is_verified"]
                    : 0,
                "created_at" => new \DateTime()->format("Y-m-d H:i:s"),
            ];

            // Insert into database
            $connection->insert("user", $insertData);

            // Get new ID
            $newUserId = $connection->lastInsertId();

            // Log the creation
            $logger->log(
                "USER_CREATED",
                "Admin created user ID {$newUserId} ({$data["username"]})",
            );

            return new JsonResponse([
                "status" => "success",
                "message" => "User created successfully",
                "user_id" => $newUserId,
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
