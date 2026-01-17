<?php

namespace App\Controller\API\Authenticated;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Doctrine\DBAL\Connection;

class GetRoles extends AbstractController
{
    #[Route("/api/get-roles", name: "get-roles", methods: ["GET"])]
    public function GetRoles(Connection $connection): JsonResponse
    {
        $roles = $connection->fetchAllAssociative(
            "SELECT * from role",
        );
        

        return new JsonResponse([
            "status" => "ok",
            "roles" => [
                $roles
            ]
        ], 200);
    }
}
