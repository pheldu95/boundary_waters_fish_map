import { MapContainer, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import LocationMarker from './LocationMarker';
import { useCaughtFishes } from '../../lib/hooks/caughtFish/useCaughtFishes';
import LoadingMapPlaceholder from '../../components/placeholders/LoadingMapPlaceholder';
import CaughtFishPopup from '../caughtFish/CaughtFishPopup';
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes';
import { useAuth } from '../../AuthContext';

type Props = {
    addingCaughtFish: boolean;
    filters?: CaughtFishFilters
}

export default function MapComponent({ addingCaughtFish, filters }: Props) {
    const { user } = useAuth();
    const { allCaughtFishes } = useCaughtFishes(filters, user?.id);

    if (!allCaughtFishes) return <LoadingMapPlaceholder />;

    return (
        <MapContainer
            center={[48.0, -91.0]}
            zoom={9}
            scrollWheelZoom={true}
            style={{ height: "55vh", width: "90%" }}
            className='mx-auto z-1'
        >
            <TileLayer
                attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
                url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                maxNativeZoom={17} // This tile layer goes up to zoom level 16
                maxZoom={30} // Allow zooming in further. Makes map blurry though
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
