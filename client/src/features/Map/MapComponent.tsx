import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

export default function MapComponent() {
    return (
        <MapContainer 
            center={[48.0, -91.0]} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "400px", width: "80%" }}
            className='mx-auto my-4 rounded-lg shadow-lg '
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[48.0, -91.0]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    )
}
