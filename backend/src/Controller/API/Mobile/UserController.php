<?php

namespace App\Controller\API\Mobile;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class UserController extends AbstractController
{
    #[
        Route(
            "/api/user/update-token",
            name: "api_user_update_token",
            methods: ["POST"],
        ),
    ]
    public function updateFcmToken(
        Request $request,
        EntityManagerInterface $em,
    ): JsonResponse {
        $user = $this->getUser(); // Get current logged-in user
        $data = json_decode($request->getContent(), true);
        $token = $data["fcmToken"] ?? null;

        if (!$token) {
            return new JsonResponse(["error" => "Token required"], 400);
        }

        $user->setFcmToken($token);
        $em->flush();

        return new JsonResponse(["status" => "Token updated"]);
    }
}
