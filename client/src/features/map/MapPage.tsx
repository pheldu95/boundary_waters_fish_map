import { useState } from 'react'
import MapComponent from './MapComponent'
import MapButton from '../../components/buttons/MapButton';

export default function MapPage() {
    const [addingCaughtFish, setAddingCaughtFish] = useState(false);
    return (
        <div className='flex'>

            <div className='h-full w-[90%] bg-fishblue mx-auto my-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)]'>
                <div className='flex w-[90%] mx-auto'>
                    <div className='justify-items-start flex-none mt-4'>
                        {addingCaughtFish ?
                            <MapButton onClickProps={() => setAddingCaughtFish(false)} text='Cancel' />
                            :
                            <MapButton onClickProps={() => setAddingCaughtFish(true)} text='Add a Caught Fish' />
                        }
                        <MapButton text='Species'/>
                        <MapButton text='Lure'/>
                    </div>
                </div>
                <div className={addingCaughtFish ? 'map-container-add-fish' : ''}>
                    <MapComponent addingCaughtFish={addingCaughtFish} />
                </div>
            </div>
        </div>
    )
}
