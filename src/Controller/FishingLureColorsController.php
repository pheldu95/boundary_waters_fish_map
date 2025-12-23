<?php

namespace App\Controller;

use App\Enum\FishingLureColor;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class FishingLureColorsController extends AbstractController
{
    #[Route('/api/fishing_lure_colors', methods: ['GET'])]
    public function getColors(): JsonResponse
    {
        $colors = array_map(
            fn($color) => ['value' => $color->value, 'label' => $color->getLabel()],
            FishingLureColor::cases()
        );

        return $this->json($colors);
    }
}
