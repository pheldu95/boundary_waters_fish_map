import LoadingSpinner from '../../components/placeholders/LoadingSpinner'
import type { FishSpecies } from '../../lib/types'
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes'
import { getIconFishColor } from '../../utils/fishIconColors'

type Props = {
    caughtFishFilters: CaughtFishFilters
    handleSpeciesChange: (speciesId: string) => void
    fishSpecies?: FishSpecies[]
}

export default function MapActiveFiltersSection({ caughtFishFilters, handleSpeciesChange, fishSpecies }: Props) {
    if (!fishSpecies) return <LoadingSpinner />

    const fishIconColors: Record<string, string> = {};

    fishSpecies.forEach(species => {
        fishIconColors[species.id] = getIconFishColor(species.name);
    });

    return (
        <div className="text-yellowishbone">
            {caughtFishFilters.fishSpeciesIds && <p className="bg-foresty">Species</p>}
            <div className="grid grid-cols-4 items-center rounded-b-lg bg-foresty shadow-md">
                {caughtFishFilters.fishSpeciesIds &&
                    caughtFishFilters.fishSpeciesIds?.map((speciesId) => {
                        const species = fishSpecies.find(s => s.id.toString() === speciesId); //find fish species so we can dsiplay its name in the tooltip
                        return (
                            <div className="group relative inline-block" key={speciesId}>
                             <button onClick={() => handleSpeciesChange(speciesId)}>
                                 <i className={`fa-solid fa-fish fa-xl ${fishIconColors[speciesId]} cursor-pointer mx-1 hover:text-redishhover hover:translate-x-[2px] hover:translate-y-[2px] `}></i>
                             </button>
                             <div 
                             className="z-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-gray-50 text-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                 <p>
                                    <p>{species?.name || 'Unknown'}</p>
                                 </p>
                                 <p>
                                     (Click to remove filter)
                                 </p>
                             </div>
                         </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
