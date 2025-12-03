<?php

namespace App\Factory;

use App\Entity\CaughtFish;
use Zenstruck\Foundry\Persistence\PersistentObjectFactory;

/**
 * @extends PersistentObjectFactory<CaughtFish>
 */
final class CaughtFishFactory extends PersistentObjectFactory
{
    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services
     *
     * @todo inject services if required
     */
    public function __construct() {}

    #[\Override]
    public static function class(): string
    {
        return CaughtFish::class;
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories
     *
     * @todo add your default values here
     */
    #[\Override]
    protected function defaults(): array|callable
    {
        return [
            'caughtBy' => UserFactory::new(),
            'caughtDate' => \DateTimeImmutable::createFromMutable(self::faker()->dateTime()),
            'latitude' => self::faker()->randomFloat(5, 47.0, 48.1),
            'longitude' => self::faker()->randomFloat(5, -92.9, -91.0),
            'note' => self::faker()->paragraph()
        ];
    }

    /**
     * @see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
     */
    #[\Override]
    protected function initialize(): static
    {
        return $this
            // ->afterInstantiate(function(CaughtFish $caughtFish): void {})
        ;
    }
}
