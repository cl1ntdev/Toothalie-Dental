<?php

namespace App\Controller\API\Authenticated;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;
use Doctrine\DBAL\ArrayParameterType;

final class GetAppointmentTypes extends AbstractController
{
    #[
        Route(
            "/api/get-appointment-types",
            methods: ["GET"],
            name: "get-appointment-types",
        ),
    ]
    public function getAppointmentTypes(Connection $connection)
    {
        $data = $connection->fetchAllAssociative(
            "SELECT * from appointment_type",
        );

        return new JsonResponse([
            "data" => $data,
        ]);
    }
}
