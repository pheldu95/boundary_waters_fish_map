import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import { DivIcon } from 'leaflet'
import { useCampsite } from '../../lib/hooks/useCampsite';

export default function MapComponent() {
    const { campsites, isPending } = useCampsite();

    if (!campsites || isPending) return <p>Loading...</p>;

    const campsiteIcon = new DivIcon({
        html: `
            <div class="campsite-marker">
                <i class="fas fa-campground "></i>
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
            style={{ height: "400px", width: "80%" }}
            className='mx-auto my-4 rounded-lg shadow-lg '
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* <Marker position={[48.0, -91.0]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker> */}
            <MarkerClusterGroup chunkedLoading>
                {campsites.map((campsite) => (
                    <Marker
                        key={campsite.id}
                        position={[campsite.latitude, campsite.longitude]}
                        icon={campsiteIcon}
                    >
                        <Popup>{campsite.url}</Popup>
                    </Marker>
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    )
}
