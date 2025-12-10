import LoadingSpinner from '../../components/placeholders/LoadingSpinner'
import type { FishingLure, FishSpecies } from '../../lib/types'
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes'
import { getIconFishColor } from '../../utils/fishIconColors'
import { getFishingLureIconColor } from '../../utils/fishingLureIconColors'

type Props = {
    caughtFishFilters: CaughtFishFilters;
    handleSpeciesChange: (speciesId: string) => void;
    fishSpecies?: FishSpecies[];
    handleFishingLureChange: (speciesId: string) => void;
    fishingLures?: FishingLure[];
}

export default function MapActiveFiltersSection({
    caughtFishFilters,
    handleSpeciesChange,
    fishSpecies,
    handleFishingLureChange,
    fishingLures
}: Props) {
    if (!fishSpecies) return <LoadingSpinner />

    const fishIconColors: Record<string, string> = {};

    fishSpecies.forEach(species => {
        fishIconColors[species.id] = getIconFishColor(species.name);
    });

    return (
        <div className="flex">
            {/* fish species */}
            <div className="text-yellowishbone flex-1">
                {caughtFishFilters.fishSpeciesIds && <p className="bg-foresty">Species</p>}
                <div className="grid grid-cols-4 items-center rounded-b-lg bg-foresty shadow-md">
                    {caughtFishFilters.fishSpeciesIds &&
                        caughtFishFilters.fishSpeciesIds?.map((speciesId) => {
                            const species = fishSpecies.find(s => s.id.toString() === speciesId); //find fish species so we can display its name in the tooltip
                            return (
                                <div className="group relative inline-block" key={speciesId}>
                                    <button onClick={() => handleSpeciesChange(speciesId)}>
                                        <i className={`fa-solid fa-fish fa-xl ${fishIconColors[speciesId]} cursor-pointer mx-1 hover:text-redishhover hover:translate-x-[2px] hover:translate-y-[2px] `}></i>
                                    </button>
                                    <div
                                        className="z-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-50 text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    >
                                        <p>{species?.name || 'Unknown'}</p>
                                        <p>(Click to remove filter)</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>

            {/* fishing lures */}
            <div className="text-yellowishbone flex-1">
                {caughtFishFilters.fishingLureIds && <p className="bg-foresty">Lures</p>}
                <div className="grid grid-cols-4 items-center rounded-b-lg bg-foresty shadow-md">
                    {caughtFishFilters.fishingLureIds && fishingLures &&
                        caughtFishFilters.fishingLureIds?.map((fishingLureId) => {
                            const fishingLure = fishingLures.find(s => s.id.toString() === fishingLureId); //find fishing lure so we can display its name in the tooltip
                            if (!fishingLure) return <LoadingSpinner />
                            const iconColor = getFishingLureIconColor(fishingLure.color);
                            console.log(iconColor);
                            return (
                                <div className="group relative inline-block" key={fishingLureId}>
                                    <button onClick={() => handleFishingLureChange(fishingLureId)}>
                                        <i className={`fa-solid fa-shrimp fa-xl ${iconColor} cursor-pointer mx-1 hover:text-redishhover hover:translate-x-[2px] hover:translate-y-[2px] px-2`}></i>
                                    </button>
                                    <div
                                        className="z-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-50 text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                    >
                                        <p>{fishingLure?.name || 'Unknown'}</p>
                                        <p>(Click to remove filter)</p>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    )
}
