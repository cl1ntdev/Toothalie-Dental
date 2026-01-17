<?php

namespace App\Controller\API\Authenticated\Patient;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use App\Service\ActivityLogger;

class DeleteAppointmentAPI extends AbstractController
{
    #[
        Route(
            "/api/delete-appointment",
            name: "patient_delete_appointment",
            methods: ["POST"]
        ),
    ]
    public function deleteAppointment(
        Request $req,
        Connection $connection,
        ActivityLogger $logger
    ): JsonResponse {
        date_default_timezone_set('Asia/Manila');

        try {
            $data = json_decode($req->getContent(), true);
            $appointmentID = $data['appointmentID'] ?? null;

            if (!$appointmentID) {
                return new JsonResponse([
                    'status' => 'error',
                    'message' => 'Missing appointmentID',
                ], 400);
            }

            $appointment = $connection->fetchAssociative(
                "SELECT * FROM appointment WHERE id = ?",
                [$appointmentID]
            );

            if (!$appointment) {
                return new JsonResponse([
                    'status' => 'error',
                    'message' => 'Appointment not found',
                ], 404);
            }

            $connection->update(
                'appointment',
                ['deleted_on' => new \DateTime()->format('Y-m-d H:i:s')],
                ['id' => $appointmentID]
            );

            $logger->log(
                'RECORD_DELETED',
                "Patient deleted appointment ID {$appointmentID}",
                null, 
                [
                    'actor_type' => 'PATIENT',
                    'appointment_snapshot' => $appointment, 
                ]
            );

            return new JsonResponse([
                'status' => 'success',
                'message' => 'Appointment deleted successfully',
                'appointment_id' => $appointmentID,
            ]);
        } catch (\Exception $e) {
            $logger->log(
                'ERROR',
                "Failed to delete appointment: " . $e->getMessage(),
                null,
                ['actor_type' => 'PATIENT']
            );

            return new JsonResponse([
                'status' => 'error',
                'message' => 'Failed to delete appointment: ' . $e->getMessage(),
            ], 500);
        }
    }
}