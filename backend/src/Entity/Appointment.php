<?php

namespace App\Entity;

use App\Entity\Service;

use App\Repository\AppointmentRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

use Symfony\Component\Serializer\Attribute\Groups;

#[
    ApiResource(
        operations: [
            new Get(),
            new GetCollection(),
            new Post(),
            new Put(),
            // new Delete(),
            new Patch(),
        ],
        normalizationContext: [
            "groups" => ["appointment:read"],
        ],
        denormalizationContext: [
            "groups" => ["appointment:write"],
        ],
    ),
]
#[ORM\Entity(repositoryClass: AppointmentRepository::class)]
class Appointment
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["appointment:read"])]
    private ?int $id = null;

    #[
        ORM\Column(
            type: Types::DATETIME_MUTABLE,
            options: ["default" => "CURRENT_TIMESTAMP"],
        ),
    ]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?\DateTime $appointmentDate = null;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[
        ORM\JoinColumn(
            name: "patient_id",
            referencedColumnName: "id",
            nullable: false,
        ),
    ]
    #[Groups(["appointment:read", "appointment:write"])]
    private User $patient;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[
        ORM\JoinColumn(
            name: "dentist_id",
            referencedColumnName: "id",
            nullable: false,
        ),
    ]
    #[Groups(["appointment:read", "appointment:write"])]
    private User $dentist;

    #[ORM\ManyToOne(targetEntity: Schedule::class, inversedBy: "appointments")]
    #[
        ORM\JoinColumn(
            name: "schedule_id",
            referencedColumnName: "id",
            nullable: false,
        ),
    ]
    #[Groups(["appointment:read", "appointment:write"])]
    private Schedule $schedule;

    #[ORM\Column(nullable: true)]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?bool $Emergency = null;

    #[ORM\ManyToOne(inversedBy: "appointments")]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?AppointmentType $appointmentType = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?string $userSetDate = null;

    #[ORM\Column(length: 50, nullable: true)]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?string $status = null;

    #[ORM\Column(length: 200, nullable: true)]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?string $message = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?\DateTime $deletedOn = null;

    #[ORM\ManyToOne(targetEntity: Service::class, inversedBy: "appointments")]
    #[
        ORM\JoinColumn(
            name: "service_id",
            referencedColumnName: "id",
            nullable: true,
        ),
    ]
    #[Groups(["appointment:read", "appointment:write"])]
    private ?Service $service = null;

    // Getters & Setters

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getAppointmentDate(): ?\DateTime
    {
        return $this->appointmentDate;
    }

    public function setAppointmentDate(\DateTime $appointmentDate): static
    {
        $this->appointmentDate = $appointmentDate;
        return $this;
    }

    public function getPatient(): User
    {
        return $this->patient;
    }

    public function setPatient(User $patient): static
    {
        $this->patient = $patient;
        return $this;
    }

    public function getDentist(): User
    {
        return $this->dentist;
    }

    public function setDentist(User $dentist): static
    {
        $this->dentist = $dentist;
        return $this;
    }

    public function getSchedule(): Schedule
    {
        return $this->schedule;
    }

    public function setSchedule(Schedule $schedule): static
    {
        $this->schedule = $schedule;
        return $this;
    }

    public function isEmergency(): ?bool
    {
        return $this->Emergency;
    }

    public function setEmergency(?bool $Emergency): static
    {
        $this->Emergency = $Emergency;
        return $this;
    }

    public function getAppointmentType(): ?AppointmentType
    {
        return $this->appointmentType;
    }

    public function setAppointmentType(
        ?AppointmentType $appointmentType,
    ): static {
        $this->appointmentType = $appointmentType;
        return $this;
    }

    public function getUserSetDate(): ?string
    {
        return $this->userSetDate;
    }

    public function setUserSetDate(?string $userSetDate): static
    {
        $this->userSetDate = $userSetDate;
        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): static
    {
        $this->status = $status;
        return $this;
    }

    public function getMessage(): ?string
    {
        return $this->message;
    }

    public function setMessage(?string $message): static
    {
        $this->message = $message;
        return $this;
    }

    public function getDeletedOn(): ?\DateTime
    {
        return $this->deletedOn;
    }

    public function setDeletedOn(?\DateTime $deletedOn): static
    {
        $this->deletedOn = $deletedOn;
        return $this;
    }

    public function getService(): ?Service
    {
        return $this->service;
    }

    public function setService(?Service $service): static
    {
        $this->service = $service;
        return $this;
    }
}
