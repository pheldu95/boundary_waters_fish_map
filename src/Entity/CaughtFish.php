<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CaughtFishRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CaughtFishRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['caughtFish:read']],
    denormalizationContext: ['groups' => ['caughtFish:write']],
    paginationClientEnabled: true,
)]
#[ApiFilter(SearchFilter::class, properties: ['fishSpecies.id' => 'exact', 'fishingLure.id' => 'exact', 'caughtBy.id' => 'exact'])]
#[ApiFilter(DateFilter::class, properties: ['caughtDate'])]
class CaughtFish
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['caughtFish:read'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 15, scale: 13)]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?string $latitude = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 16, scale: 13)]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?string $longitude = null;

    #[ORM\Column]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?\DateTimeImmutable $caughtDate = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?float $length = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?User $caughtBy = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?FishSpecies $fishSpecies = null;

    #[ORM\ManyToOne(inversedBy: 'caughtFish')]
    #[Groups(['caughtFish:read', 'caughtFish:write'])]
    private ?FishingLure $fishingLure = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $note = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude !== null ? (float) $this->latitude : null;
    }

    public function setLatitude(?float $latitude): self
    {
        $this->latitude = $latitude !== null ? (string) $latitude : null;
        
        return $this;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude !== null ? (float) $this->longitude : null;
    }

    public function setLongitude(string $longitude): static
    {
        $this->longitude = $longitude !== null ? (string) $longitude : null;

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

    public function getNote(): ?string
    {
        return $this->note;
    }

    public function setNote(?string $note): static
    {
        $this->note = $note;

        return $this;
    }
}
