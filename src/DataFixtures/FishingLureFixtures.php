<?php

namespace App\DataFixtures;

use App\Entity\FishingLure;
use App\Entity\User;
use App\Enum\FishingLureColor;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class FishingLureFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $userRepository = $manager->getRepository(User::class);
        $adminUser = $userRepository->findOneBy(['email' => 'phelps.duncan@gmail.com']);

        $fishingLures = [
            ['Rapala Shad Rap', FishingLureColor::RED],
            ['Mepps Aglia Spinner', FishingLureColor::SILVER],
            ['Berkley Gulp! Minnow', FishingLureColor::CHARTREUSE],
            ['Strike King Red Eye Shad', FishingLureColor::BLUE],
            ['Johnson Silver Minnow', FishingLureColor::WHITE],
            ['Booyah Flex', FishingLureColor::GREEN],
            ['Heddon Lucky 13', FishingLureColor::BLACK],
            ['Rebel Pop-R', FishingLureColor::ORANGE],
            ['Panther Martin Classic', FishingLureColor::GOLD],
            ['Rapala Original Floater', FishingLureColor::PINK]
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
