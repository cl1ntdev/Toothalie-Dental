<?php

namespace App\Entity;

use App\Repository\ServiceTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
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
            // new Post(),
            // new Put(),
            // new Delete(),
        ],
        normalizationContext: [
            "groups" => ["servicetype:read"],
        ],
        denormalizationContext: [
            "groups" => ["servicetype:write"],
        ],
    ),
]
#[ORM\Entity(repositoryClass: ServiceTypeRepository::class)]
class ServiceType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["appointment:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(["appointment:read","servicetype:read"])]
    private ?string $name = null;

    #[
        ORM\OneToMany(
            mappedBy: "serviceType",
            targetEntity: Service::class,
            cascade: ["persist", "remove"],
        ),
    ]
    private Collection $services;

    public function __construct()
    {
        $this->services = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    /**
     * @return Collection<int, Service>
     */
    public function getServices(): Collection
    {
        return $this->services;
    }

    public function addService(Service $service): static
    {
        if (!$this->services->contains($service)) {
            $this->services->add($service);
            $service->setServiceType($this);
        }

        return $this;
    }

    public function removeService(Service $service): static
    {
        if ($this->services->removeElement($service)) {
            if ($service->getServiceType() === $this) {
                $service->setServiceType(null);
            }
        }

        return $this;
    }
}
