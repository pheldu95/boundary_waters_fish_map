export const fishingLureIconColorMap: Record<string, string> = {
    'Silver': 'text-gray-200',
    'Chartreuse': 'text-yellow-300',
    'Blue': 'text-blue-600',
    'White': 'text-white',
    'Green': 'text-green-200',
    'Orange': 'text-orange-600',
    'Gold': 'text-amber-600',
    'Pink': 'text-pink-500',
    'Black': 'text-black',
};

export const getFishingLureIconColor = (color: string): string => {
    return fishingLureIconColorMap[color] || 'text-gray-500';
};