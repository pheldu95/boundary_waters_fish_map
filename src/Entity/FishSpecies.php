<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\FishSpeciesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: FishSpeciesRepository::class)]
#[ApiResource]
class FishSpecies
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    /**
     * @var Collection<int, CaughtFish>
     */
    #[ORM\OneToMany(targetEntity: CaughtFish::class, mappedBy: 'fishSpecies')]
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
            $caughtFish->setFishSpecies($this);
        }

        return $this;
    }

    public function removeCaughtFish(CaughtFish $caughtFish): static
    {
        if ($this->caughtFish->removeElement($caughtFish)) {
            // set the owning side to null (unless already changed)
            if ($caughtFish->getFishSpecies() === $this) {
                $caughtFish->setFishSpecies(null);
            }
        }

        return $this;
    }
}
