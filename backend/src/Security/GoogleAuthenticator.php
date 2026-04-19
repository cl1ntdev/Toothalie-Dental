<?php
// src/Security/GoogleAuthenticator.php

namespace App\Security;

use App\Entity\User;
use App\Service\EmailVerificationService;
use Doctrine\ORM\EntityManagerInterface;
use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use KnpU\OAuth2ClientBundle\Security\Authenticator\OAuth2Authenticator;
use League\OAuth2\Client\Provider\GoogleUser;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\DependencyInjection\Attribute\Autowire;
class GoogleAuthenticator extends OAuth2Authenticator
{
    public function __construct(
        private ClientRegistry $clientRegistry,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager,
        private EmailVerificationService $emailVerificationService,
        #[Autowire("%env(SITE_BASE_URL)%")] private string $backendUrl,
        #[Autowire("%env(FRONTEND_URL)%")] private string $frontendUrl,
    ) {}

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get("_route") === "connect_google_check";
    }

    public function authenticate(Request $request): Passport
    {
        $client = $this->clientRegistry->getClient("google");
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function () use (
                $accessToken,
                $client,
            ) {
                /** @var GoogleUser $googleUser */
                $googleUser = $client->fetchUserFromToken($accessToken);
                $email = $googleUser->getEmail();

                $existingUser = $this->entityManager
                    ->getRepository(User::class)
                    ->findOneBy(["email" => $email]);

                if (!$existingUser) {
                    $existingUser = new User();
                    $existingUser->setEmail($email);
                    $existingUser->setRoles(["ROLE_PATIENT"]);
                    $googleName = $googleUser->getName();
                    if ($googleName) {
                        $existingUser->setUsername(
                            substr(
                                preg_replace("/\s+/", "_", $googleName),
                                0,
                                100,
                            ),
                        );
                    } else {
                        $existingUser->setUsername(explode("@", $email)[0]);
                    }

                    try {
                        $randomPassword = bin2hex(random_bytes(16));
                    } catch (\Exception $e) {
                        $randomPassword = bin2hex(
                            openssl_random_pseudo_bytes(16),
                        );
                    }
                    $existingUser->setPassword($randomPassword);

                    if (method_exists($googleUser, "getFirstName")) {
                        $existingUser->setFirstName(
                            $googleUser->getFirstName(),
                        );
                    }
                    if (method_exists($googleUser, "getLastName")) {
                        $existingUser->setLastName($googleUser->getLastName());
                    }

                    $existingUser->setCreatedAt(new \DateTimeImmutable());
                    $existingUser->setIsVerified(true);
                    $this->entityManager->persist($existingUser);
                    $this->entityManager->flush();
                }

                if (!$existingUser->isVerified()) {
                    // Generate verification token
                    $verificationToken = $this->emailVerificationService->generateVerificationToken();
                    $existingUser->setVerificationToken($verificationToken);
                    $existingUser->setIsVerified(false);

                    $this->entityManager->persist($existingUser);
                    $this->entityManager->flush();

                    // Generate verification URL
                    $verificationUrl =
                        $this->backendUrl . "/verify-email?token=" .
                        urlencode($verificationToken);

                    // Send verification email
                    $this->emailVerificationService->sendVerificationEmail(
                        $existingUser,
                        $verificationUrl,
                    );

                    throw new CustomUserMessageAuthenticationException(
                        "Your account is not verified. A new verification email has been sent. Please verify your email before logging in.",
                    );
                }

                return $existingUser;
            }),
        );
    }

    public function onAuthenticationSuccess(
        Request $request,
        TokenInterface $token,
        string $firewallName,
    ): ?Response {
        $user = $token->getUser();

        $jwtToken = $this->jwtManager->create($user);

        // Redirect back to the React frontend with the token in the URL parameters
        $targetUrl = $this->frontendUrl . "/auth/callback?token=" . $jwtToken;

        return new RedirectResponse($targetUrl);
    }

    public function onAuthenticationFailure(
        Request $request,
        AuthenticationException $exception,
    ): ?Response {
        $message = strtr(
            $exception->getMessageKey(),
            $exception->getMessageData(),
        );

        return new RedirectResponse(
            $this->frontendUrl . "/login?error=" . urlencode($message),
        );
    }
}
