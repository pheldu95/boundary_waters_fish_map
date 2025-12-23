export const fishingLureIconColorMap: Record<string, string> = {
    'silver': 'text-gray-200',
    'chartreuse': 'text-yellow-300',
    'blue': 'text-blue-600',
    'white': 'text-white',
    'green': 'text-green-200',
    'orange': 'text-orange-600',
    'gold': 'text-amber-600',
    'pink': 'text-pink-500',
    'black': 'text-black',
    'red': 'text-red-500'
};

export const getFishingLureIconColor = (color: string): string => {
    return fishingLureIconColorMap[color] || 'text-black';
};