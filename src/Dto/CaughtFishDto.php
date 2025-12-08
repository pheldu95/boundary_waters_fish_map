<?php
namespace App\Dto;

use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\ObjectMapper\Attribute\Map;

#[Map]
final class CaughtFishDto
{
    #[Assert\NotBlank]
    public string $latitude;

    #[Assert\NotBlank]
    public string $longitude;

    #[Assert\NotNull]
    public \DateTimeImmutable $caughtDate;

    #[Assert\Positive]
    public ?float $length;

    #[Assert\NotBlank]
    public int $fishSpeciesId;

    public ?int $fishingLureId;

    public ?string $note = null;

    public function __construct(
        string $latitude,
        string $longitude,
        \DateTimeImmutable $caughtDate,
        ?float $length,
        int $fishSpeciesId,
        ?int $fishingLureId,
        ?string $note = null
    ) {
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->caughtDate = $caughtDate;
        $this->length = $length;
        $this->fishSpeciesId = $fishSpeciesId;
        $this->fishingLureId = $fishingLureId;
        $this->note = $note;
    }
}