<?php
namespace App\Enum;

enum FishingLureColor: string
{
    case RED = 'red';
    case BLUE = 'blue';
    case GREEN = 'green';
    case YELLOW = 'yellow';
    case ORANGE = 'orange';
    case PURPLE = 'purple';
    case BLACK = 'black';
    case WHITE = 'white';
    case SILVER = 'silver';
    case GOLD = 'gold';
    case CHARTREUSE = 'chartreuse';
    case PINK = 'pink';
    
    public function getLabel(): string
    {
        return match($this) {
            self::RED => 'Red',
            self::BLUE => 'Blue',
            self::GREEN => 'Green',
            self::YELLOW => 'Yellow',
            self::ORANGE => 'Orange',
            self::PURPLE => 'Purple',
            self::BLACK => 'Black',
            self::WHITE => 'White',
            self::SILVER => 'Silver',
            self::GOLD => 'Gold',
            self::CHARTREUSE => 'Chartreuse',
            self::PINK => 'Pink',
        };
    }
}