<?php

namespace App\Controller\API\Auth;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Firebase\JWT\JWK;
use Firebase\JWT\JWT;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class GoogleAuthenticatorMobile extends AbstractController
{
    public function __construct(
        private readonly EntityManagerInterface $entityManager,
        private readonly JWTTokenManagerInterface $jwtManager,
        private readonly HttpClientInterface $httpClient,
    ) {
        // Injected the HTTP Client
    }

    #[
        Route(
            "/api/auth/google/mobile",
            name: "api_google_mobile_auth",
            methods: ["POST"],
        ),
    ]
    public function authenticateMobileUser(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $tokenId = $data["tokenId"] ?? null;

        if (!$tokenId) {
            return new JsonResponse(
                ["error" => "No token ID provided"],
                JsonResponse::HTTP_BAD_REQUEST,
            );
        }

        try {
            // 1. Fetch Google's public keys
            $response = $this->httpClient->request(
                "GET",
                "https://www.googleapis.com/oauth2/v3/certs",
                [
                    "extra" => [
                        "curl" => [
                            \CURLOPT_IPRESOLVE => \CURL_IPRESOLVE_V4,
                        ],
                    ],
                ],
            );
            $jwks = $response->toArray();

            // 2. Parse the keys and decode the JWT
            $keys = JWK::parseKeySet($jwks);
            $payload = (array) JWT::decode($tokenId, $keys);

            // 3. Verify the Audience matches your Mobile Web Client ID
            $clientId = $_ENV["MOBILE_WEB_CLIENT_ID"] ?? null;
            if (
                $clientId &&
                isset($payload["aud"]) &&
                $payload["aud"] !== $clientId
            ) {
                throw new \Exception("Invalid token audience.");
            }

            // 4. Verify the Issuer
            if (
                !in_array(
                    $payload["iss"] ?? "",
                    ["accounts.google.com", "https://accounts.google.com"],
                    true,
                )
            ) {
                throw new \Exception("Invalid token issuer.");
            }
        } catch (\Throwable $e) {
            // If the token is expired, tampered with, or invalid, JWT::decode will throw an exception
            return new JsonResponse(
                ["error" => "Invalid Google token: " . $e->getMessage()],
                JsonResponse::HTTP_UNAUTHORIZED,
            );
        }

        $email = $payload["email"] ?? null;
        $googleName = $payload["name"] ?? null;
        $firstName = $payload["given_name"] ?? null;
        $lastName = $payload["family_name"] ?? null;

        if (!$email) {
            return new JsonResponse(
                ["error" => "Google token did not include an email"],
                JsonResponse::HTTP_UNAUTHORIZED,
            );
        }

        $user = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(["email" => $email]);

        if (!$user) {
            $user = new User();
            $user->setEmail($email);
            $user->setRoles(["ROLE_PATIENT"]);

            if ($googleName) {
                $username = substr(
                    (string) preg_replace("/\s+/", "_", $googleName),
                    0,
                    100,
                );
                $user->setUsername($username);
            } else {
                $user->setUsername(explode("@", $email)[0]);
            }

            try {
                $randomPassword = bin2hex(random_bytes(16));
            } catch (\Throwable) {
                $randomPassword = bin2hex(openssl_random_pseudo_bytes(16));
            }
            $user->setPassword($randomPassword);

            if ($firstName) {
                $user->setFirstName($firstName);
            }
            if ($lastName) {
                $user->setLastName($lastName);
            }

            $user->setCreatedAt(new \DateTimeImmutable());
            $user->setIsVerified(true);

            $this->entityManager->persist($user);
            $this->entityManager->flush();
        }

        if (!$user->isVerified()) {
            return new JsonResponse(
                [
                    "error" =>
                        "Your account is not verified. Please check your email.",
                ],
                JsonResponse::HTTP_FORBIDDEN,
            );
        }

        $jwtToken = $this->jwtManager->create($user);

        return new JsonResponse([
            "token" => $jwtToken,
            "user" => [
                "email" => $user->getEmail(),
                "roles" => $user->getRoles(),
            ],
        ]);
    }
}
