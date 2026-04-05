<?php

namespace App\Controller\API\Authenticated\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use App\Service\ActivityLogger;

final class AdminRoleController extends AbstractController
{
    public function __construct(private ActivityLogger $logger) {}

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

    #[Route("/api/admin/roles", methods: ["GET"], name: "admin_get_roles")]
    public function list(Connection $connection): JsonResponse
    {
        $authError = $this->denyUnlessAdmin();
        if ($authError) {
            return $authError;
        }

        $data = $connection->fetchAllAssociative(
            "SELECT id, role_name FROM role",
        );
        return new JsonResponse(["status" => "ok", "data" => $data]);
    }

    #[
        Route(
            "/api/admin/create-role",
            methods: ["POST"],
            name: "admin_create_role",
        ),
    ]
    public function create(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $authError = $this->denyUnlessAdmin();
        if ($authError) {
            return $authError;
        }

        $payload = json_decode($request->getContent(), true);
        $name = $payload["name"] ?? null;
        if (!$name) {
            return new JsonResponse(
                ["status" => "error", "message" => "Missing name"],
                400,
            );
        }

        $connection->executeStatement(
            "INSERT INTO role (role_name) VALUES (?)",
            [$name],
        );
        $newId = $connection->lastInsertId();
        $this->logger->log(
            "ROLE_CREATED",
            "Admin created role '{$name}' with ID {$newId}",
        );
        return new JsonResponse(["status" => "ok"]);
    }

    #[
        Route(
            "/api/admin/update-role",
            methods: ["POST"],
            name: "admin_update_role",
        ),
    ]
    public function update(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $authError = $this->denyUnlessAdmin();
        if ($authError) {
            return $authError;
        }

        $p = json_decode($request->getContent(), true);
        $id = $p["id"] ?? null;
        $name = $p["name"] ?? null;
        if (!$id || !$name) {
            return new JsonResponse(
                ["status" => "error", "message" => "Missing id or name"],
                400,
            );
        }

        $connection->executeStatement(
            "UPDATE role SET role_name = ? WHERE id = ?",
            [$name, $id],
        );
        $this->logger->log(
            "ROLE_UPDATED",
            "Admin updated role ID {$id} to name '{$name}'",
        );
        return new JsonResponse(["status" => "ok"]);
    }

    #[
        Route(
            "/api/admin/delete-role",
            methods: ["POST"],
            name: "admin_delete_role",
        ),
    ]
    public function delete(
        Request $request,
        Connection $connection,
    ): JsonResponse {
        $authError = $this->denyUnlessAdmin();
        if ($authError) {
            return $authError;
        }

        $p = json_decode($request->getContent(), true);
        $id = $p["id"] ?? null;
        if (!$id) {
            return new JsonResponse(
                ["status" => "error", "message" => "Missing id"],
                400,
            );
        }

        $nameBeforeDelete = $connection->fetchOne(
            "SELECT role_name FROM role WHERE id = ?",
            [$id],
        );
        $connection->executeStatement("DELETE FROM role WHERE id = ?", [$id]);
        $this->logger->log(
            "ROLE_DELETED",
            "Admin deleted role '{$nameBeforeDelete}' (ID: {$id})",
        );
        return new JsonResponse(["status" => "ok"]);
    }
}
