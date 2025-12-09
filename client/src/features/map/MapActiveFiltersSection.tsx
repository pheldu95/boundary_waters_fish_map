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
        <div className="grid grid-cols-4 items-center">
            {caughtFishFilters.fishSpeciesIds &&
                caughtFishFilters.fishSpeciesIds.map((speciesId) => (
                    <div className="group relative inline-block">
                        <button onClick={() => handleSpeciesChange(speciesId)}>
                            <i className={`fa-solid fa-fish fa-xl ${fishIconColors[speciesId]} cursor-pointer mx-1`}></i>
                        </button>
                        <div className="z-2 absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2 bg-redish text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <p>
                                Click to remove filter
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}
