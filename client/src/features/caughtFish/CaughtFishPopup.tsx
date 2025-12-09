import { Marker, Popup } from 'react-leaflet'
import type { CaughtFishRead } from '../../lib/types/caughtFishTypes'
import type { DivIcon } from 'leaflet'

type Props = {
    caughtFish: CaughtFishRead
    icon: DivIcon
}
export default function CaughtFishPopup({ caughtFish, icon }: Props) {
    return (
        <Marker
            key={caughtFish.id}
            position={[caughtFish.latitude, caughtFish.longitude]}
            icon={icon}
        >
            <Popup>
                <div className="flex">
                    <div className="flex-1">
                        {caughtFish.fishSpecies.name}
                    </div>
                    <div className="flex-1">
                        {caughtFish.caughtDate}
                    </div>
                </div>

                <div>
                    {caughtFish.fishingLure ? caughtFish.fishingLure.name : ''}
                </div>

                <div>
                    {caughtFish.length} inches
                </div>
            </Popup>
        </Marker>
    )
}
