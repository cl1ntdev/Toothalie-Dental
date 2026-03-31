<?php

namespace App\EventSubscriber;

use App\Entity\Appointment;
use App\Entity\User;
use App\Service\ActivityLogger;
use Doctrine\Bundle\DoctrineBundle\EventSubscriber\EventSubscriberInterface;
use Doctrine\ORM\Events;
use Doctrine\Persistence\Event\LifecycleEventArgs;
use Symfony\Bundle\SecurityBundle\Security;

class UserActivitySubscriber implements EventSubscriberInterface
{
    private ActivityLogger $logger;
    private Security $security;

    public function __construct(ActivityLogger $logger, Security $security)
    {
        $this->logger = $logger;
        $this->security = $security;
    }

    public function getSubscribedEvents(): array
    {
        return [Events::postPersist, Events::postUpdate, Events::postRemove];
    }

    public function postPersist(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        $actor = $this->security->getUser();

        if ($entity instanceof User) {
            $this->logger->log(
                "USER_CREATED",
                "Created user ID {$entity->getId()} ({$entity->getUserIdentifier()})",
                $actor,
            );
        } elseif ($entity instanceof Appointment) {
            $this->logger->log(
                "APPOINTMENT_CREATED",
                "Created appointment ID {$entity->getId()}",
                $actor,
            );
        }
    }

    public function postUpdate(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        $actor = $this->security->getUser();

        if ($entity instanceof User) {
            $this->logger->log(
                "USER_UPDATED",
                "Updated user ID {$entity->getId()} ({$entity->getUserIdentifier()})",
                $actor,
            );
        } elseif ($entity instanceof Appointment) {
            $this->logger->log(
                "APPOINTMENT_UPDATED",
                "Updated appointment ID {$entity->getId()}",
                $actor,
            );
        }
    }

    public function postRemove(LifecycleEventArgs $args): void
    {
        $entity = $args->getObject();
        $actor = $this->security->getUser();

        if ($entity instanceof User) {
            $this->logger->log(
                "USER_DELETED",
                "Deleted user ID {$entity->getId()}",
                $actor,
            );
        } elseif ($entity instanceof Appointment) {
            $this->logger->log(
                "APPOINTMENT_DELETED",
                "Deleted appointment ID {$entity->getId()}",
                $actor,
            );
        }
    }
}
