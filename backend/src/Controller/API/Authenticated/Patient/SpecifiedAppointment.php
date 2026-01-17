<?php

namespace App\Controller\API\Authenticated\Patient;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

class SpecifiedAppointment extends AbstractController
{
    // >> >> >> << << << 
    // 
    // Returns only one (1) Appointment of the user, used for editing
    // 
    // >> >> >> << << << 
    #[Route('/api/specified-appointment', name: "specified-appointment", methods: ['POST'])]
    public function getAppointment(Request $req, Connection $connection): JsonResponse
    {
        try {
            $data = json_decode($req->getContent(), true);
            $appointmentID = $data['appointmentID'] ?? null;

            if (!$appointmentID) {
                return new JsonResponse([
                    'status' => 'error',
                    'message' => 'appointmentID is required'
                ], 400);
            }

            // 1. Fetch the Appointment
            // User confirmed: appointment primary key is "id"
            $appointment = $connection->fetchAssociative(
                "SELECT * FROM appointment WHERE id = ?",
                [$appointmentID]
            );

            if (!$appointment) {
                return new JsonResponse([
                    'status' => 'error',
                    'message' => 'Appointment not found'
                ], 404);
            }

            // 2. Fetch the Dentist info
            $dentist = $connection->fetchAssociative(
                "SELECT * FROM user WHERE id = ?",
                [$appointment['dentist_id']]
            );

            // 3. Fetch ALL Schedules for this Dentist (for the dropdown/selection list)
            // User confirmed: schedule primary key is "id"
            $schedules = $connection->fetchAllAssociative(
                "SELECT id, day_of_week, time_slot 
                 FROM schedule 
                 WHERE dentistID = ? 
                 ORDER BY day_of_week, time_slot",
                [$appointment['dentist_id']]
            );

            $groupedSchedules = [];
            foreach ($schedules as $s) {
                $groupedSchedules[$s['day_of_week']][] = [
                    'id' => $s['id'],
                    'time_slot'  => $s['time_slot']
                ];
            }

            // 4. Fetch the SPECIFIC Schedule currently assigned to this appointment
            // FIX: We must use the foreign key 'schedule_id' from the appointment, 
            // NOT the appointment's own 'id'.
            $selectedSchedule = null;
            
            if (!empty($appointment['schedule_id'])) {
                $selectedSchedule = $connection->fetchAssociative(
                    "SELECT id, day_of_week, time_slot 
                     FROM schedule 
                     WHERE id = ?", 
                    [$appointment['schedule_id']] // <--- FIXED THIS LINE
                );
            }

            return new JsonResponse([
                'status' => 'ok',
                'appointment' => $appointment,
                'dentist' => $dentist,
                'schedules' => $groupedSchedules,
                'scheduleDetails' => $selectedSchedule
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'status' => 'error',
                'message' => $e->getMessage(),
            ], 500);
        }
    }
}