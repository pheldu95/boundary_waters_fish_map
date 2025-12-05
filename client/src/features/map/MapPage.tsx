import { useState } from 'react'
import MapComponent from './MapComponent'
import MapButton from '../../components/buttons/MapButton';

export default function MapPage() {
    const [addingCaughtFish, setAddingCaughtFish] = useState(false);
    return (
        <div className='h-full w-[90%] bg-fishblue mx-auto my-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,0.1)] pb-8 border-3 border-redish'>
            <div className='flex w-[90%] mx-auto justify-between'>

                <div className='flex mt-4'>
                    {addingCaughtFish ?
                        <MapButton onClickProps={() => setAddingCaughtFish(false)} text='Cancel' />
                        :
                        <MapButton onClickProps={() => setAddingCaughtFish(true)} text='Add a Caught Fish' />
                    }
                    <MapButton text='Add a Lure' />
                    <div className="flex items-center p-4 text-yellowishbone">
                        <i className="fa-solid fa-arrow-left-long fa-lg"></i>
                        <p className="ml-2">Actions</p>
                    </div>
                </div>

                <div className='flex mt-4'>
                    <div className="flex items-center p-4 text-yellowishbone">
                        <p className="mr-2">Filters</p>
                        <i className="fa-solid fa-arrow-right-long fa-lg"></i>
                    </div>

                    <MapButton text='Species' />
                    <MapButton text='Lure' />
                    <MapButton text='Length' />
                </div>

            </div>
            <div className={addingCaughtFish ? 'map-container-add-fish' : ''}>
                <MapComponent addingCaughtFish={addingCaughtFish} />
            </div>
        </div>

    )
}
