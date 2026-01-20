<?php

namespace App\Controller\API\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

final class AdminRoleController extends AbstractController
{
    #[Route('/api/admin/roles', methods: ['GET'], name: 'admin_get_roles')]
    public function list(Connection $connection): JsonResponse
    {
        $data = $connection->fetchAllAssociative('SELECT id, role_name FROM role');
        return new JsonResponse(['status' => 'ok', 'data' => $data]);
    }

    #[Route('/api/admin/create-role', methods: ['POST'], name: 'admin_create_role')]
    public function create(Request $request, Connection $connection): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        $name = $payload['name'] ?? null;
        if (!$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing name'], 400);

        $connection->executeStatement('INSERT INTO role (role_name) VALUES (?)', [$name]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/update-role', methods: ['POST'], name: 'admin_update_role')]
    public function update(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        $name = $p['name'] ?? null;
        if (!$id || !$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing id or name'], 400);

        $connection->executeStatement('UPDATE role SET role_name = ? WHERE id = ?', [$name, $id]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/delete-role', methods: ['POST'], name: 'admin_delete_role')]
    public function delete(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        if (!$id) return new JsonResponse(['status' => 'error', 'message' => 'Missing id'], 400);

        $connection->executeStatement('DELETE FROM role WHERE id = ?', [$id]);
        return new JsonResponse(['status' => 'ok']);
    }
}
