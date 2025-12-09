import { useState } from 'react'
import MapComponent from './MapComponent'
import MapButton from '../../components/buttons/MapButton';
import MapButtonBottom from '../../components/buttons/MapButtonBottom';
// import { TileLayer } from 'react-leaflet';
import DraggableWindow from '../../components/DraggableWindow';
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes';
import { useFishSpecies } from '../../lib/hooks/useFishSpecies';

export default function MapPage() {
    const { fishSpecies } = useFishSpecies();
    const [selectFishSpecies, setSelectFishSpecies] = useState(false);
    const [addingCaughtFish, setAddingCaughtFish] = useState(false);
    const [filters, setFilters] = useState<CaughtFishFilters>({
        fishSpeciesId: undefined,
    });

    const handleSpeciesChange = (speciesId: string | undefined) => {
        setFilters(prev => ({
            ...prev,
            fishSpeciesId: speciesId
        }));

        setSelectFishSpecies(false);
    };

    // const tileLayerOptions = [
    //     <TileLayer
    //         attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>'
    //         url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    //         maxNativeZoom={17} // This tile layer goes up to zoom level 16
    //         maxZoom={20} // Allow zooming in further. Makes map blurry though
    //     />,
    //     <TileLayer
    //         attribution='Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    //         url="https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}"
    //         maxNativeZoom={16} // This tile layer goes up to zoom level 16
    //         maxZoom={20} // Allow zooming in further. Makes map blurry though
    //     />
    // ];

    return (
        <DraggableWindow
            key={1}
            title={'Fish Map'}
            initialX={180}
            initialY={80}
            width={1500}
            onClose={() => console.log('close')}
            constrainToViewport={false}
        >
            <div className='h-full w-[100%] bg-fishblue mx-auto pb-8 border-r border-l border-gray-500 font-bold shadow-2xl'>
                <div className='flex w-[90%] mx-auto justify-between'>

                    <div className='flex mt-4'>
                        {addingCaughtFish ?
                            <MapButton onClickProps={() => setAddingCaughtFish(false)} text='Cancel' color={'bg-redish'} hoverColor={'bg-redishhover'} />
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

                        <MapButton text='Species' onClickProps={() => setSelectFishSpecies(!selectFishSpecies)} />
                        {selectFishSpecies && fishSpecies &&
                            <select
                                onChange={(e) => handleSpeciesChange(e.target.value)}
                                value={filters.fishSpeciesId || ''}
                            >
                                <option value="">All Species</option>
                                {fishSpecies.map(species => (
                                    <option key={species.id} value={species.id}>
                                        {species.name}
                                    </option>
                                ))}
                            </select>
                        }
                        <MapButton text='Lure' />
                        <MapButton text='Length' />
                    </div>

                </div>
                <div className={addingCaughtFish ? 'map-container-add-fish' : ''}>
                    <MapComponent addingCaughtFish={addingCaughtFish} filters={filters} />
                </div>
                <div className='flex w-[90%] mx-auto'>
                    <div className='flex mb-4'>
                        <MapButtonBottom text='Tile Layer' />
                    </div>
                    <div className="flex items-center p-4 text-yellowishbone">
                        <i className="fa-solid fa-arrow-left-long fa-lg"></i>
                        <p className="ml-2">Map Tile Layer</p>
                    </div>
                </div>
            </div>
        </DraggableWindow>
    )
}
