import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import LocationMarker from './LocationMarker';
import { useCaughtFishes } from '../../lib/hooks/useCaughtFish';
import LoadingMapPlaceholder from '../../components/placeholders/LoadingMapPlaceholder';
import CaughtFishPopup from '../caughtFish/CaughtFishPopup';
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes';

type Props = {
    addingCaughtFish: boolean;
    filters?: CaughtFishFilters
}

export default function MapComponent({ addingCaughtFish, filters }: Props) {
    
    const { allCaughtFishes } = useCaughtFishes(filters);

    if (!allCaughtFishes) return <LoadingMapPlaceholder />;

    return (
        <MapContainer
            center={[48.0, -91.0]}
            zoom={10}
            scrollWheelZoom={true}
            style={{ height: "480px", width: "90%" }}
            className='mx-auto z-1'
        >
            <TileLayer
                attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                maxNativeZoom={17} // This tile layer goes up to zoom level 16
                maxZoom={20} // Allow zooming in further. Makes map blurry though
            />
            <MarkerClusterGroup
                chunkedLoading
                // disableClusteringAtZoom={1}
                showCoverageOnHover={false}
                spiderfyOnMaxZoom={false}
            >
                {allCaughtFishes.map((caughtFish) => (
                    <CaughtFishPopup caughtFish={caughtFish} />
                ))}
            </MarkerClusterGroup>

            {addingCaughtFish ? <LocationMarker /> : null}
        </MapContainer>
    )
}
