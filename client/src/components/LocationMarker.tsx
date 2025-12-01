import { useState } from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet'

export default function LocationMarker() {
    const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    const map = useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            setPosition({
                latitude: lat,
                longitude: lng,
            });
            map.flyTo(e.latlng, map.getZoom())
        },
    });

    return position === null ? null : (
        <Marker position={[position.latitude, position.longitude]}>
            <Popup>Caught a fish here</Popup>
        </Marker>
    )
}
