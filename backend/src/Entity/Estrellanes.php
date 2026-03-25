<?php

namespace App\Entity;

use App\Repository\EstrellanesRepository;
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
        new Post(),
        new Put(),
        new Delete()
    ],
    normalizationContext: [
        'groups' => ['estrellanes:read']
    ],
    denormalizationContext: [
        'groups' => ['estrellanes:write']
    ]
)]
#[ORM\Entity(repositoryClass: EstrellanesRepository::class)]
#[ORM\Table(name: 'Estrellanes')]
class Estrellanes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["estrellanes:read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["estrellanes:read", "estrellanes:write"])]
    private ?string $name = null;

    #[ORM\Column]
    #[Groups(["estrellanes:read", "estrellanes:write"])]
    private ?int $age = null;

    #[ORM\Column]
    #[Groups(["estrellanes:read", "estrellanes:write"])]
    private ?int $yr_lvl = null;

    #[ORM\Column(length: 255)]
    #[Groups(["estrellanes:read", "estrellanes:write"])]
    private ?string $course = null;

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

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;
        return $this;
    }

    public function getYrLvl(): ?int
    {
        return $this->yr_lvl;
    }

    public function setYrLvl(int $yr_lvl): static
    {
        $this->yr_lvl = $yr_lvl;
        return $this;
    }

    public function getCourse(): ?string
    {
        return $this->course;
    }

    public function setCourse(string $course): static
    {
        $this->course = $course;
        return $this;
    }
}