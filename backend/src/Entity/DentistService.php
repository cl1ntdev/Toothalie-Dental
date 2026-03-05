<?php

namespace App\Entity;

use App\Repository\DentistServiceRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;


#[ApiResource(
    operations: [
        new Get(),
        new GetCollection(),
        // new Post(),
        // new Put(),
        // new Delete()
    ],
    normalizationContext: [
        'groups' => ['dentistservice:read']
    ],
    denormalizationContext: [
        'groups' => ['dentistservice:write']
    ]
)]
#[ORM\Entity(repositoryClass: DentistServiceRepository::class)]
class DentistService
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["appointment:read","dentistservice:read"])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: "dentistServices")]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["appointment:read", "dentistservice:read"])]
    private ?User $user = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["appointment:read"])]
    private ?Service $service = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
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
