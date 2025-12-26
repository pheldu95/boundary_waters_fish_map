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
    length?: number;
    removeLengthFilter: () => void;
}

export default function MapActiveFiltersSection({
    caughtFishFilters,
    handleSpeciesChange,
    fishSpecies,
    handleFishingLureChange,
    fishingLures,
    length,
    removeLengthFilter
}: Props) {
    if (!fishSpecies) return <LoadingSpinner />

    const fishIconColors: Record<string, string> = {};

    fishSpecies.forEach(species => {
        fishIconColors[species.id] = getIconFishColor(species.name);
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* fish species */}
            <div className="text-secondary">
                {caughtFishFilters.fishSpeciesIds && <p className="bg-foresty">Species</p>}
                <div className="grid grid-cols-4 items-center rounded-b-lg bg-foresty shadow-md">
                    {caughtFishFilters.fishSpeciesIds &&
                        caughtFishFilters.fishSpeciesIds?.map((speciesId) => {
                            const species = fishSpecies.find(s => s.id.toString() === speciesId); //find fish species so we can display its name in the tooltip
                            return (
                                <div className="group relative inline-block" key={speciesId}>
                                    <button onClick={() => handleSpeciesChange(speciesId)}>
                                        <i className={`fa-solid fa-fish fa-xl ${fishIconColors[speciesId]} cursor-pointer mx-1 hover:text-negativehover hover:translate-x-[2px] hover:translate-y-[2px] `}></i>
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
            <div className="text-secondary">
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
                                        <i className={`fa-solid fa-shrimp fa-xl ${iconColor} cursor-pointer mx-1 hover:text-negativehover hover:translate-x-[2px] hover:translate-y-[2px]`}></i>
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

            {/* length greater or equal to filter */}
            <div className="text-secondary">
                {length && length > 0 &&
                    <button
                        className="
                group px-8 py-4 bg-foresty text-secondary font-bold 
                hover:bg-negativehover transition-colors 
                hover:translate-x-[2px] hover:translate-y-[2px] 
                transition-all cursor-pointer
                rounded-b-lg
                shadow-md
            "
                        onClick={removeLengthFilter}
                        type={'button'}
                    >
                        <span className="group-hover:hidden inline-block transition-all duration-300">
                            Length &ge; {length}
                        </span>
                        <span className="hidden group-hover:inline-block transition-all duration-300">
                            Remove filter
                        </span>
                    </button>
                }
            </div>
        </div>
    )
}
