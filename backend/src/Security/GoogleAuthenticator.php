<?php
// src/Security/GoogleAuthenticator.php

namespace App\Security;

use App\Entity\User;
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
class GoogleAuthenticator extends OAuth2Authenticator
{
    public function __construct(
        private ClientRegistry $clientRegistry,
        private EntityManagerInterface $entityManager,
        private JWTTokenManagerInterface $jwtManager
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return $request->attributes->get('_route') === 'connect_google_check';
    }

    public function authenticate(Request $request): Passport
    {
        $client = $this->clientRegistry->getClient('google');
        $accessToken = $this->fetchAccessToken($client);

        return new SelfValidatingPassport(
            new UserBadge($accessToken->getToken(), function() use ($accessToken, $client) {
                /** @var GoogleUser $googleUser */
                $googleUser = $client->fetchUserFromToken($accessToken);
                $email = $googleUser->getEmail();

                $existingUser = $this->entityManager->getRepository(User::class)->findOneBy(['email' => $email]);

                if (!$existingUser) {
                    throw new CustomUserMessageAuthenticationException('No account found for this Google email. Please register first.');
                }

                if (!$existingUser->isVerified()) {
                    throw new CustomUserMessageAuthenticationException('Your account is not verified. Please verify your email before logging in.');
                }

                return $existingUser;
            })
        );
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        $user = $token->getUser();

        $jwtToken = $this->jwtManager->create($user);
        
        // Redirect back to the React frontend with the token in the URL parameters
        $targetUrl = 'http://localhost:5173/auth/callback?token=' . $jwtToken;

        return new RedirectResponse($targetUrl);
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        $message = strtr($exception->getMessageKey(), $exception->getMessageData());
        
        // Redirect back to React login page with an error
        return new RedirectResponse('http://localhost:5173/login?error=' . urlencode($message));
    }
}