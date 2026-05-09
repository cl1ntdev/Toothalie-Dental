<?php
namespace App\Service;

use Kreait\Firebase\Factory;
use Kreait\Firebase\Contract\Messaging;
use Kreait\Firebase\Messaging\CloudMessage;

class FcmService
{
    private Messaging $messaging;

    public function __construct(string $projectDir)
    {
        // Manual initialization using the credentials file
        $factory = new Factory()->withServiceAccount(
            $projectDir . "/config/firebase_credentials.json",
        );

        $this->messaging = $factory->createMessaging();
    }

    public function sendAppointmentNotification(
        string $deviceToken,
        string $title,
        string $body,
        array $extraData = [],
    ): void {
        // 1. Build the hybrid message using the v7.x Array format
        $message = CloudMessage::fromArray([
            'token' => $deviceToken,
            'notification' => [
                'title' => $title,
                'body' => $body,
            ],
            'data' => array_merge($extraData, [
                "click_action" => "FLUTTER_NOTIFICATION_CLICK", // Standard for many libraries
                "app_name" => "Toothalie",
            ]),
        ]);

        try {
            $this->messaging->send($message);
        } catch (\Exception $e) {
            error_log("FCM Send Error: " . $e->getMessage());
        }
    }
}