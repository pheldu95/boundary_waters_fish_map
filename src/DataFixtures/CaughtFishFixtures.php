<?php

namespace App\DataFixtures;

use App\Entity\FishingLure;
use App\Entity\FishSpecies;
use App\Entity\User;
use App\Factory\CaughtFishFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CaughtFishFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $users = $manager->getRepository(User::class)->findAll();
        $lures = $manager->getRepository(FishingLure::class)->findAll();
        $species = $manager->getRepository(FishSpecies::class)->findAll();

        CaughtFishFactory::createMany(50, function () use ($users, $lures, $species) {
            return [
                'caughtBy' => $users[array_rand($users)],
                'fishingLure' => $lures[array_rand($lures)],
                'fishSpecies' => $species[array_rand($species)],
            ];
        });
    }

    /**
     * @return list<class-string<FixtureInterface>>
     */
    public function getDependencies(): array
    {
        return [FishingLureFixtures::class, AppFixtures::class, FishSpeciesFixtures::class];
    }
}
