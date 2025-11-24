<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CaughtFishRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CaughtFishRepository::class)]
#[ApiResource]
class CaughtFish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 15, scale: 13)]
    private ?string $latitude = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 16, scale: 13)]
    private ?string $longitude = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $caughtDate = null;

    #[ORM\Column(nullable: true)]
    private ?float $length = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $caughtBy = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    private ?FishSpecies $fishSpecies = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    private ?FishingLure $fishingLure = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLatitude(): ?string
    {
        return $this->latitude;
    }

    public function setLatitude(string $latitude): static
    {
        $this->latitude = $latitude;

        return $this;
    }

    public function getLongitude(): ?string
    {
        return $this->longitude;
    }

    public function setLongitude(string $longitude): static
    {
        $this->longitude = $longitude;

        return $this;
    }

    public function getCaughtDate(): ?\DateTimeImmutable
    {
        return $this->caughtDate;
    }

    public function setCaughtDate(\DateTimeImmutable $caughtDate): static
    {
        $this->caughtDate = $caughtDate;

        return $this;
    }

    public function getLength(): ?float
    {
        return $this->length;
    }

    public function setLength(?float $length): static
    {
        $this->length = $length;

        return $this;
    }

    public function getCaughtBy(): ?User
    {
        return $this->caughtBy;
    }

    public function setCaughtBy(?User $caughtBy): static
    {
        $this->caughtBy = $caughtBy;

        return $this;
    }

    public function getFishSpecies(): ?FishSpecies
    {
        return $this->fishSpecies;
    }

    public function setFishSpecies(?FishSpecies $fishSpecies): static
    {
        $this->fishSpecies = $fishSpecies;

        return $this;
    }

    public function getFishingLure(): ?FishingLure
    {
        return $this->fishingLure;
    }

    public function setFishingLure(?FishingLure $fishingLure): static
    {
        $this->fishingLure = $fishingLure;

        return $this;
    }
}
