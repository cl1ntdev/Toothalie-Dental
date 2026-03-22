<?php

namespace App\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

final class SendForm extends AbstractController
{
    private $httpClient;
    private string $brevoApiKey;

    public function __construct(HttpClientInterface $httpClient, string $brevoApiKey)
    {
        $this->httpClient = $httpClient;
        $this->brevoApiKey = $brevoApiKey;
    }

    #[Route("/api/send-form", name: "app_send_form", methods: ["POST"])]
    public function __invoke(Request $request): JsonResponse
    {
        if ('' === trim($this->brevoApiKey)) {
            return new JsonResponse(
                ['status' => 'error', 'message' => 'Server misconfigured: BREVO_API_KEY is missing.'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        // Brevo has multiple key types; Contacts API (v3) expects an API key (often starts with "xkeysib-").
        // If you accidentally paste the SMTP key (often starts with "xsmtpsib-"), Brevo will respond 401.
        if (str_starts_with($this->brevoApiKey, 'xsmtpsib-')) {
            return new JsonResponse(
                ['status' => 'error', 'message' => 'Server misconfigured: BREVO_API_KEY looks like an SMTP key. Use a Brevo API key for the Contacts API (v3).'],
                Response::HTTP_INTERNAL_SERVER_ERROR
            );
        }

        $data = json_decode($request->getContent(), true);

        $email = $data['email'] ?? null;
        $name = $data['name'] ?? 'Guest';
        // You can pass the message as a 'Contact Attribute' if you set it up in Brevo
        $message = $data['message'] ?? '';

        if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return new JsonResponse(['error' => 'Valid email is required'], 400);
        }

        $payload = [
            'email' => $email,
            'attributes' => [
                'NAME' => $name,
                'MESSAGE' => $message 
            ],
            'listIds' => [3], 
            'updateEnabled' => true 
        ];

        try {
            $response = $this->httpClient->request('POST', 'https://api.brevo.com/v3/contacts', [
                'headers' => [
                    'api-key' => $this->brevoApiKey,
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json',
                ],
                'json' => $payload,
            ]);

            // Brevo returns 201 for Created or 204 for Updated
            if (in_array($response->getStatusCode(), [201, 204])) {
                return new JsonResponse(['status' => 'success', 'message' => 'Contact added to list!']);
            }

            $statusCode = $response->getStatusCode();
            $details = $response->toArray(false);

            // Avoid leaking a confusing "Unauthorized" back to the frontend when it's actually Brevo auth.
            if (in_array($statusCode, [Response::HTTP_UNAUTHORIZED, Response::HTTP_FORBIDDEN], true)) {
                return new JsonResponse(
                    ['status' => 'error', 'message' => 'Brevo authentication failed. Check BREVO_API_KEY.', 'details' => $details],
                    Response::HTTP_BAD_GATEWAY
                );
            }

            return new JsonResponse(['status' => 'error', 'details' => $details], $statusCode);

        } catch (\Exception $e) {
            return new JsonResponse(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }
}