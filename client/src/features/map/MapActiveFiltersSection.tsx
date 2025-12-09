import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes'

type Props = {
    caughtFishFilters: CaughtFishFilters
}

export default function MapActiveFiltersSection( {caughtFishFilters}: Props ) {
  return (
    <div>
        {caughtFishFilters.fishSpeciesIds &&
            caughtFishFilters.fishSpeciesIds.map((speciesId) => (
                <div>{speciesId}</div>
            ))
        }
    </div>
  )
}
