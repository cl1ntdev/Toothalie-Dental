<?php

namespace App\Entity;

use App\Repository\ScheduleRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Attribute\Groups;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;

#[
    ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        // new Post(),
        // new Put(),
        // new Delete()
    ],
        normalizationContext: ["groups" => ["schedule:read"]],
        denormalizationContext: ["groups" => ["schedule:write"]],
    ),
]
#[ORM\Entity(repositoryClass: ScheduleRepository::class)]
class Schedule
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    #[Groups(["appointment:read", "schedule:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 20)]
    #[Groups(["appointment:read", "schedule:read"])]
    private string $dayOfWeek;

    #[ORM\Column(length: 20)]
    #[Groups(["appointment:read", "schedule:read"])]
    private string $timeSlot;

    #[ORM\ManyToOne(targetEntity: User::class)]
    #[
        ORM\JoinColumn(
            name: "dentistID",
            referencedColumnName: "id",
            nullable: false,
        ),
    ]
    #[Groups(["appointment:read", "schedule:read"])]
    private User $dentist;

    #[
        ORM\OneToMany(
            mappedBy: "schedule",
            targetEntity: Appointment::class,
            cascade: ["persist", "remove"],
        ),
    ]
    private Collection $appointments;

    public function __construct()
    {
        $this->appointments = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayOfWeek(): string
    {
        return $this->dayOfWeek;
    }

    public function setDayOfWeek(string $dayOfWeek): static
    {
        $this->dayOfWeek = $dayOfWeek;
        return $this;
    }

    public function getTimeSlot(): string
    {
        return $this->timeSlot;
    }

    public function setTimeSlot(string $timeSlot): static
    {
        $this->timeSlot = $timeSlot;
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

    /**
     * @return Collection<int, Appointment>
     */
    public function getAppointments(): Collection
    {
        return $this->appointments;
    }

    public function addAppointment(Appointment $appointment): static
    {
        if (!$this->appointments->contains($appointment)) {
            $this->appointments->add($appointment);
            $appointment->setSchedule($this);
        }
        return $this;
    }

    public function removeAppointment(Appointment $appointment): static
    {
        if ($this->appointments->removeElement($appointment)) {
            // set the owning side to null (unless already changed)
            if ($appointment->getSchedule() === $this) {
                $appointment->setSchedule(null);
            }
        }
        return $this;
    }

    public function __toString(): string
    {
        return $this->dayOfWeek . " " . $this->timeSlot;
    }
}
