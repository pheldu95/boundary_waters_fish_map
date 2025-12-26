import { useState } from 'react'
import MapComponent from './MapComponent'
import MapButton from '../../components/buttons/MapButton';
import MapButtonBottom from '../../components/buttons/MapButtonBottom';
// import { TileLayer } from 'react-leaflet';
import DraggableWindow from '../../components/DraggableWindow';
import type { CaughtFishFilters } from '../../lib/types/caughtFishTypes';
import { useFishSpecies } from '../../lib/hooks/useFishSpecies';
import MapActiveFiltersSection from './MapActiveFiltersSection';
import { useFishingLure } from '../../lib/hooks/useFishingLure';
import { useAuth } from '../../AuthContext';
import FishingLureForm from '../fishingLures/FishingLureForm';
import FormModal from '../../components/modals/FormModal';
import LengthFilter from './LengthFilter';

export default function MapPage() {
    const { user } = useAuth();

    const { fishSpecies } = useFishSpecies();
    const { myFishingLures } = useFishingLure(undefined, user?.id);
    const [addingCaughtFish, setAddingCaughtFish] = useState(false);
    const [addingFishingLure, setAddingFishingLure] = useState(false);
    const [selectingLength, setSelectingLength] = useState(false);
    const [filters, setFilters] = useState<CaughtFishFilters>({
        fishSpeciesIds: undefined,
        fishingLureIds: undefined,
        length: undefined
    });

    const handleSpeciesChange = (speciesId: string) => {
        setFilters(prev => ({
            ...prev,
            fishSpeciesIds: prev.fishSpeciesIds?.includes(speciesId)
                ? prev.fishSpeciesIds.filter(id => id !== speciesId) //remove if already selected
                : [...(prev.fishSpeciesIds || []), speciesId] //add if not selected
        }));
    };

    const handleFishingLureChange = (fishingLureId: string) => {
        setFilters(prev => ({
            ...prev,
            fishingLureIds: prev.fishingLureIds?.includes(fishingLureId)
                ? prev.fishingLureIds.filter(id => id !== fishingLureId) //remove if already selected
                : [...(prev.fishingLureIds || []), fishingLureId] //add if not selected
        }));
    }

    const handleLengthFilterSubmit = (length: number) => {
        setFilters(prev => ({
            ...prev,
            length: length
        }));
        setSelectingLength(false);
    }
    const removeLengthFilter = () => {
        setFilters(prev => ({
            ...prev,
            length: undefined
        }));
    }

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

    //gettin x and y to center the draggable window
    const centerX = window.innerWidth * 0.05; //5% from left
    const centerY = window.innerHeight * 0.1; //20% from top

    return (

        <DraggableWindow
            key={1}
            title={'Fish Map'}
            initialX={centerX}
            initialY={centerY}
            width={90}
            onClose={() => console.log('close')}
            constrainToViewport={false}
            navbarHeight={64}
        >
            <div className='h-full w-[100%] bg-primary mx-auto pb-8 border-r border-l border-gray-500 font-bold shadow-2xl'>

                {/* temporary */}
                {addingFishingLure &&
                    <FormModal
                        children={<FishingLureForm closeForm={() => setAddingFishingLure(false)} />}
                        title='Add a New Lure'
                        closeForm={() => setAddingFishingLure(false)}
                    />
                }

                <div className='flex w-[90%] mx-auto justify-between'>
                    <div className='flex mt-4'>
                        {addingCaughtFish ?
                            <MapButton onClickProps={() => setAddingCaughtFish(false)} text='Cancel' color={'bg-negative'} hoverColor={'bg-negativehover'} />
                            :
                            <MapButton onClickProps={() => setAddingCaughtFish(true)} text='Add a Caught Fish' />
                        }

                        {addingFishingLure ?
                            <MapButton onClickProps={() => setAddingFishingLure(false)} text='Cancel' color={'bg-negative'} hoverColor={'bg-negativehover'} />
                            :
                            <MapButton onClickProps={() => setAddingFishingLure(true)} text='Add a Lure' />
                        }

                        <div className="flex items-center p-4 text-secondary">
                            <i className="fa-solid fa-arrow-left-long fa-lg"></i>
                            <p className="ml-2">Actions</p>
                        </div>
                    </div>

                    <div className='flex mt-4'>
                        <div className="flex items-center p-4 text-secondary">
                            <p className="mr-2">Filters</p>
                            <i className="fa-solid fa-arrow-right-long fa-lg"></i>
                        </div>

                        {fishSpecies &&
                            <select
                                onChange={(e) => handleSpeciesChange(e.target.value)}
                                value={''}
                                className="w-38 group px-8 py-4 bg-foresty text-secondary font-bold 
                                        hover:bg-forestyhover transition-colors 
                                        hover:translate-x-[2px] hover:translate-y-[2px] 
                                        transition-all cursor-pointer
                                        rounded-t-lg focus:outline-none
                                        shadow-md"
                            >
                                <option className="bg-gray-50 text-black" value="">Species</option>
                                {fishSpecies.map(species => (
                                    filters.fishSpeciesIds?.includes(species.id.toString()) ? (
                                        <option key={species.id} value={species.id} className="bg-foresty text-secondary cursor-pointer">
                                            ✓ {species.name}
                                        </option>
                                    ) : (
                                        <option key={species.id} value={species.id} className="bg-gray-50 text-black cursor-pointer">
                                            {species.name}
                                        </option>
                                    )
                                ))}
                            </select>
                        }

                        {myFishingLures &&
                            <select
                                onChange={(e) => handleFishingLureChange(e.target.value)}
                                value={''}
                                className="w-38 group px-8 py-4 bg-foresty text-secondary font-bold 
                                        hover:bg-forestyhover transition-colors 
                                        hover:translate-x-[2px] hover:translate-y-[2px] 
                                        transition-all cursor-pointer
                                        rounded-t-lg focus:outline-none
                                        shadow-md"
                            >
                                <option className="bg-gray-50 text-black" value="">Lures</option>
                                {myFishingLures.map(lure => (
                                    filters.fishingLureIds?.includes(lure.id.toString()) ? (
                                        <option key={lure.id} value={lure.id} className="bg-foresty text-secondary cursor-pointer">
                                            ✓ {lure.name}
                                        </option>
                                    ) : (
                                        <option key={lure.id} value={lure.id} className="bg-gray-50 text-black cursor-pointer">
                                            {lure.name}
                                        </option>
                                    )
                                ))}
                            </select>
                        }

                        {selectingLength ?
                            <div>
                                <MapButton onClickProps={() => setSelectingLength(false)} text='Cancel' color={'bg-negative'} hoverColor={'bg-negativehover'} />
                                <FormModal title='Length &ge;' children={<LengthFilter handleLengthFilterSubmit={handleLengthFilterSubmit} />} closeForm={() => setSelectingLength(false)} />
                            </div>
                            :
                            <MapButton text='Length' onClickProps={() => setSelectingLength(true)} />
                        }
                    </div>

                </div>
                <div className={addingCaughtFish ? 'map-container-add-fish' : ''}>
                    <MapComponent addingCaughtFish={addingCaughtFish} filters={filters} />
                </div>
                <div className='flex w-[90%] mx-auto justify-between'>
                    <div className='flex mb-4'>
                        <MapButtonBottom text='Tile Layer' />
                        <div className="flex items-center p-4 text-secondary">
                            <i className="fa-solid fa-arrow-left-long fa-lg"></i>
                            <p className="ml-2">Map Tile Layer</p>
                        </div>
                    </div>

                    <div className='flex mb-4'>
                        <div className="flex items-center p-4 text-secondary">
                            <p className="mr-2">Active Filters</p>
                            <i className="fa-solid fa-arrow-right-long fa-lg"></i>
                        </div>
                        {filters.fishSpeciesIds || filters.fishingLureIds || filters.length ?
                            <MapActiveFiltersSection
                                caughtFishFilters={filters}
                                handleSpeciesChange={handleSpeciesChange}
                                fishSpecies={fishSpecies}

                                handleFishingLureChange={handleFishingLureChange}
                                fishingLures={myFishingLures}

                                removeLengthFilter={removeLengthFilter}
                                length={filters.length}
                            />
                            :
                            <div className="flex items-center p-4 text-secondary">
                                <p className="mr-2">None Applied</p>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </DraggableWindow>
    )
}
