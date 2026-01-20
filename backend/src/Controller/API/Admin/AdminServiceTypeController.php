<?php

namespace App\Controller\API\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

final class AdminServiceTypeController extends AbstractController
{
    #[Route('/api/admin/service-types', methods: ['GET'], name: 'admin_get_service_types')]
    public function list(Connection $connection): JsonResponse
    {
        $data = $connection->fetchAllAssociative('SELECT id, name FROM service_type');
        return new JsonResponse(['status' => 'ok', 'data' => $data]);
    }

    #[Route('/api/admin/create-service-type', methods: ['POST'], name: 'admin_create_service_type')]
    public function create(Request $request, Connection $connection): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        $name = $payload['name'] ?? null;
        if (!$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing name'], 400);

        $connection->executeStatement('INSERT INTO service_type (name) VALUES (?)', [$name]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/update-service-type', methods: ['POST'], name: 'admin_update_service_type')]
    public function update(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        $name = $p['name'] ?? null;
        if (!$id || !$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing id or name'], 400);

        $connection->executeStatement('UPDATE service_type SET name = ? WHERE id = ?', [$name, $id]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/delete-service-type', methods: ['POST'], name: 'admin_delete_service_type')]
    public function delete(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        if (!$id) return new JsonResponse(['status' => 'error', 'message' => 'Missing id'], 400);

        $connection->executeStatement('DELETE FROM service_type WHERE id = ?', [$id]);
        return new JsonResponse(['status' => 'ok']);
    }
}
