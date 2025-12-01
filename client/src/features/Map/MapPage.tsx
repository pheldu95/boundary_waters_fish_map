import { useState } from 'react'
import MapComponent from './MapComponent'

export default function MapPage() {
    const [addingCaughtFish, setAddingCaughtFish] = useState(false);
    return (
        <div>
            <h1>Map Page</h1>
            <button onClick={() => setAddingCaughtFish(true)}>Add a Caught Fish</button>
            <MapComponent addingCaughtFish={addingCaughtFish} />
        </div>
    )
}
