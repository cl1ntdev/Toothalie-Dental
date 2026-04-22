<?php
namespace App\Controller\Api;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GoogleAuthControllerMobile extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager
    ) {}

    #[Route('/api/auth/google/mobile', name: 'api_google_mobile_auth', methods: ['POST'])]
    public function authenticateMobileUser(Request $request): JsonResponse
    {
        // 1. Decode the JSON payload from React Native
        $data = json_decode($request->getContent(), true);
        $tokenId = $data['tokenId'] ?? null;

        if (!$tokenId) {
            return new JsonResponse(['error' => 'No token ID provided'], 400);
        }

        // 2. Initialize Google Client and Verify Token
        $client = new \Google_Client(['client_id' => '%env(MOBILE_WEB_CLIENET_ID)%']);
        $payload = $client->verifyIdToken($tokenId);

        if (!$payload) {
            return new JsonResponse(['error' => 'Invalid Google token'], 401);
        }

        // 3. Extract user details from the verified Google payload
        $email = $payload['email'];
        $googleName = $payload['name'] ?? null;
        $firstName = $payload['given_name'] ?? null;
        $lastName = $payload['family_name'] ?? null;

        // 4. Check if user exists in your database
        $existingUser = $this->entityManager
            ->getRepository(User::class)
            ->findOneBy(['email' => $email]);

        // 5. Create user if they don't exist
        if (!$existingUser) {
            $existingUser = new User();
            $existingUser->setEmail($email);
            $existingUser->setRoles(['ROLE_PATIENT']);
            
            // Set Username
            if ($googleName) {
                $existingUser->setUsername(substr(preg_replace('/\s+/', '_', $googleName), 0, 100));
            } else {
                $existingUser->setUsername(explode('@', $email)[0]);
            }

            // Set a random secure password (since they use Google to log in)
            try {
                $randomPassword = bin2hex(random_bytes(16));
            } catch (\Exception $e) {
                $randomPassword = bin2hex(openssl_random_pseudo_bytes(16));
            }
            $existingUser->setPassword($randomPassword);

            // Set Names if available
            if ($firstName) {
                $existingUser->setFirstName($firstName);
            }
            if ($lastName) {
                $existingUser->setLastName($lastName);
            }

            $existingUser->setCreatedAt(new \DateTimeImmutable());
            
            // Since Google verified the email, we can trust it and skip sending an email verification code
            $existingUser->setIsVerified(true);

            $this->entityManager->persist($existingUser);
            $this->entityManager->flush();
        }

        // (Optional) If you have a strict policy that even existing Google-matched users must be manually verified:
        if (!$existingUser->isVerified()) {
             return new JsonResponse(['error' => 'Your account is not verified. Please check your email.'], 403);
        }

        // 6. Generate the Toothalie JWT for the mobile app
        $jwtToken = $this->jwtManager->create($existingUser);

        // 7. Return the token as JSON instead of a Redirect
        return new JsonResponse([
            'token' => $jwtToken,
            'user' => [
                'email' => $existingUser->getEmail(),
                'roles' => $existingUser->getRoles()
            ]
        ]);
    }
}