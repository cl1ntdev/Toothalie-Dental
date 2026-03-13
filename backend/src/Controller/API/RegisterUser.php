<?php

namespace App\Controller\API;

use App\Entity\User;
use App\Service\EmailVerificationService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface; // NEW - For generating absolute URLs

final class RegisterUser extends AbstractController
{
    #[Route("/api/register", name: "app_register", methods: ["POST"])]
    public function index(
        Request $req,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher,
        EmailVerificationService $emailVerificationService, // ADDED
    ): JsonResponse {
        $data = json_decode($req->getContent(), true);

        $required = [
            "email",
            "role",
            "password",
            "username",
            "first_name",
            "last_name",
        ];

        foreach ($required as $r) {
            if (!isset($data[$r]) || empty($data[$r])) {
                return new JsonResponse(
                    [
                        "error" => "Missing required field: $r",
                    ],
                    400,
                );
            }
        }

        $email = $data["email"];
        $role = is_array($data["role"]) ? $data["role"] : [$data["role"]];
        $password = $data["password"];
        $username = $data["username"];
        $firstName = $data["first_name"];
        $lastName = $data["last_name"];

        $user = new User();
        $user->setEmail($email);
        $user->setRoles($role);
        $user->setUsername($username);
        $user->setFirstName($firstName);
        $user->setLastName($lastName);
        $user->setCreatedAt(new \DateTimeImmutable());

        $hashedPassword = $passwordHasher->hashPassword($user, $password);
        $user->setPassword($hashedPassword);

        // Generate verification token
        $verificationToken = $emailVerificationService->generateVerificationToken();
        $user->setVerificationToken($verificationToken);
        $user->setIsVerified(false);

        $em->persist($user);
        $em->flush();

        // Generate verification URL
        $verificationUrl = $this->generateUrl(
            "app_verify_email",
            ["token" => $verificationToken],
            UrlGeneratorInterface::ABSOLUTE_URL,
        );

        // Send verification email
        $emailVerificationService->sendVerificationEmail(
            $user,
            $verificationUrl,
        );

        $this->addFlash(
            "success",
            "Registration successful! Please check your email to verify your account.",
        );

        return new JsonResponse(
            [
                "status" => "ok",
                "message" => "Verification Code Sent",
            ],
            201,
        );
        // return new JsonResponse(
        //     [
        //         "status" => "ok",
        //         "message" => "User registered successfully",
        //         "user" => [
        //             "email" => $email,
        //             "roles" => $role,
        //             "username" => $username,
        //             "first_name" => $firstName,
        //             "last_name" => $lastName,
        //             "created_at" => $user
        //                 ->getCreatedAt()
        //                 ->format("Y-m-d H:i:s"),
        //         ],
        //     ],
        //     201,
        // );
    }
}
