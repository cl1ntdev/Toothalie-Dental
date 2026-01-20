<?php

namespace App\Controller\API\Admin;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

final class AdminAppointmentTypeController extends AbstractController
{
    #[Route('/api/admin/appointment-types', methods: ['GET'], name: 'admin_get_appointment_types')]
    public function list(Connection $connection): JsonResponse
    {
        $data = $connection->fetchAllAssociative('SELECT id, appointment_name as name FROM appointment_type');
        return new JsonResponse(['status' => 'ok', 'data' => $data]);
    }

    #[Route('/api/admin/create-appointment-type', methods: ['POST'], name: 'admin_create_appointment_type')]
    public function create(Request $request, Connection $connection): JsonResponse
    {
        $payload = json_decode($request->getContent(), true);
        $name = $payload['name'] ?? null;
        if (!$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing name'], 400);

        $connection->executeStatement('INSERT INTO appointment_type (appointment_name) VALUES (?)', [$name]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/update-appointment-type', methods: ['POST'], name: 'admin_update_appointment_type')]
    public function update(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        $name = $p['name'] ?? null;
        if (!$id || !$name) return new JsonResponse(['status' => 'error', 'message' => 'Missing id or name'], 400);

        $connection->executeStatement('UPDATE appointment_type SET appointment_name = ? WHERE id = ?', [$name, $id]);
        return new JsonResponse(['status' => 'ok']);
    }

    #[Route('/api/admin/delete-appointment-type', methods: ['POST'], name: 'admin_delete_appointment_type')]
    public function delete(Request $request, Connection $connection): JsonResponse
    {
        $p = json_decode($request->getContent(), true);
        $id = $p['id'] ?? null;
        if (!$id) return new JsonResponse(['status' => 'error', 'message' => 'Missing id'], 400);

        $connection->executeStatement('DELETE FROM appointment_type WHERE id = ?', [$id]);
        return new JsonResponse(['status' => 'ok']);
    }
}
