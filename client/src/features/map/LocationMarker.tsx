import type { Marker as LeafletMarker } from 'leaflet';
import { useEffect, useRef, useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'
import CaughtFishForm from '../caughtFish/CaughtFishForm';

export default function LocationMarker() {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const markerRef = useRef<LeafletMarker | null>(null);

    useEffect(() => {
        if (position.latitude !== 0 && position.longitude !== 0 && markerRef.current) {
            //Wait for marker to be fully rendered before opening popup
            setTimeout(() => {
                markerRef.current?.openPopup();
            }, 0);
        }
    }, [position]);

    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            });
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    if (position.latitude === 0 && position.longitude === 0) return null;

    return (
        <Marker
            position={[position.latitude, position.longitude]}
            ref={markerRef}
        >
            <Popup
                closeOnClick={true}
            >
                <CaughtFishForm latitude={position.latitude} longitude={position.longitude} markerRef={markerRef}/>
            </Popup>
        </Marker>
    )
}