<?php
// src/Controller/GoogleController.php

namespace App\Controller\API\Auth;

use KnpU\OAuth2ClientBundle\Client\ClientRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GoogleController extends AbstractController
{
    #[Route('/connect/google', name: 'connect_google')]
    public function connectAction(ClientRegistry $clientRegistry): RedirectResponse
    {
        // Redirect to Google. The scopes are what we want to read from the user.
        return $clientRegistry
            ->getClient('google')
            ->redirect([
                'email', 'profile' // the scopes you want to access
            ]);
    }

    #[Route('/connect/google/check', name: 'connect_google_check')]
    public function connectCheckAction(Request $request, ClientRegistry $clientRegistry)
    {
        // Leave this blank! Symfony's custom authenticator intercepts this before it executes.
    }
}