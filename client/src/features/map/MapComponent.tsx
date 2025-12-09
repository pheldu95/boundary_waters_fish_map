import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { DivIcon } from 'leaflet'
import { useCampsite } from '../../lib/hooks/useCampsite';
import LocationMarker from './LocationMarker';
import { useCaughtFish } from '../../lib/hooks/useCaughtFish';
import LoadingMapPlaceholder from '../../components/placeholders/LoadingMapPlaceholder';
import CaughtFishPopup from '../caughtFish/CaughtFishPopup';

type Props = {
    addingCaughtFish: boolean;
}

export default function MapComponent({ addingCaughtFish }: Props) {
    const { campsites, isPending } = useCampsite();
    const { allCaughtFishes } = useCaughtFish();

    if (!campsites || isPending || !allCaughtFishes) return <LoadingMapPlaceholder />;

    // const campsiteIcon = new DivIcon({
    //     html: `
    //         <div class="campsite-marker">
    //             <i class="fas fa-campground "></i>
    //         </div>
    //     `,
    //     className: 'custom-div-icon',
    //     iconSize: [30, 42],
    //     iconAnchor: [15, 42],
    //     popupAnchor: [0, -42]
    // });

    const fishIcon = new DivIcon({
        html: `
            <div class="fish-marker">
                <i class="fa-solid fa-fish"></i>
            </div>
        `,
        className: 'custom-div-icon',
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42]
    });

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
            {/* <MarkerClusterGroup
                chunkedLoading
                // disableClusteringAtZoom={1}
                showCoverageOnHover={false}
                spiderfyOnMaxZoom={false}
            >
                {campsites.map((campsite) => (
                    <Marker
                        key={campsite.id}
                        position={[campsite.latitude, campsite.longitude]}
                        icon={campsiteIcon}
                    >
                        <Popup>{campsite.url}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup> */}
            <MarkerClusterGroup
                chunkedLoading
                // disableClusteringAtZoom={1}
                showCoverageOnHover={false}
                spiderfyOnMaxZoom={false}
            >
                {allCaughtFishes.map((caughtFish) => (
                    <CaughtFishPopup caughtFish={caughtFish} icon={fishIcon}/>
                ))}
            </MarkerClusterGroup>

            {addingCaughtFish ? <LocationMarker /> : null}
        </MapContainer>
    )
}
