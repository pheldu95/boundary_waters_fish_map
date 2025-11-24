<?php

namespace App\DataFixtures;

use App\Entity\EntryPoint;
use App\Entity\FishingLure;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class FishingLureFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $userRepository = $manager->getRepository(User::class);
        $adminUser = $userRepository->findOneBy(['email' => 'phelps.duncan@gmail.com']);

        $fishingLures = [
            ['Rapala Shad Rap', 'Red'],
            ['Mepps Aglia Spinner', 'Silver'],
            ['Berkley Gulp! Minnow', 'Chartreuse'],
            ['Strike King Red Eye Shad', 'Blue'],
            ['Johnson Silver Minnow', 'White'],
            ['Booyah Flex', 'Green'],
            ['Heddon Lucky 13', 'Black'],
            ['Rebel Pop-R', 'Orange'],
            ['Panther Martin Classic', 'Gold'],
            ['Rapala Original Floater', 'Pink']
        ];

        foreach ($fishingLures as [$name, $color]) {
            $fishingLure = new FishingLure();
            $fishingLure->setName($name);
            $fishingLure->setColor($color);
            $fishingLure->setAddedBy($adminUser);

            $manager->persist($fishingLure);
        }

        $manager->flush();
    }
}
