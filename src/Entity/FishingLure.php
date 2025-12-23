<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\FishingLureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: FishingLureRepository::class)]
#[ORM\HasLifecycleCallbacks]
#[ApiFilter(SearchFilter::class, properties: ['addedBy.id' => 'exact'])]
#[ApiResource]
class FishingLure
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['caughtFish:read'])]
    private ?string $name = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $color = null;

    #[ORM\ManyToOne(inversedBy: 'fishingLures')]
    private ?User $addedBy = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    /**
     * @var Collection<int, CaughtFish>
     */
    #[ORM\OneToMany(targetEntity: CaughtFish::class, mappedBy: 'fishingLure')]
    private Collection $caughtFish;

    public function __construct()
    {
        $this->caughtFish = new ArrayCollection();
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

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): static
    {
        $this->color = $color;

        return $this;
    }

    public function getAddedBy(): ?User
    {
        return $this->addedBy;
    }

    public function setAddedBy(?User $addedBy): static
    {
        $this->addedBy = $addedBy;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    #[ORM\PrePersist]
    public function setCreatedAt(): void
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    /**
     * @return Collection<int, CaughtFish>
     */
    public function getCaughtFish(): Collection
    {
        return $this->caughtFish;
    }

    public function addCaughtFish(CaughtFish $caughtFish): static
    {
        if (!$this->caughtFish->contains($caughtFish)) {
            $this->caughtFish->add($caughtFish);
            $caughtFish->setFishingLure($this);
        }

        return $this;
    }

    public function removeCaughtFish(CaughtFish $caughtFish): static
    {
        if ($this->caughtFish->removeElement($caughtFish)) {
            // set the owning side to null (unless already changed)
            if ($caughtFish->getFishingLure() === $this) {
                $caughtFish->setFishingLure(null);
            }
        }

        return $this;
    }
}
