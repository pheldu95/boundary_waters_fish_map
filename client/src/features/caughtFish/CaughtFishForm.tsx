import React, { useEffect, useState } from 'react'
import { useCaughtFish } from '../../lib/hooks/useCaughtFish'
import { useFishingLure } from '../../lib/hooks/useFishingLure';
import { useFishSpecies } from '../../lib/hooks/useFishSpecies';
import DefaultButton from '../../components/buttons/DefaultButton';
import type { Marker } from 'leaflet';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { caughtFishSchema, CaughtFishSchema } from '../../lib/schemas/caughtFishSchema';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  latitude: number;
  longitude: number;
  markerRef?: React.RefObject<Marker | null>;
}

export default function CaughtFishForm({ latitude, longitude, markerRef }: Props) {
  const { register, reset, handleSubmit, formState: {errors} } = useForm<CaughtFishSchema>({
    mode: 'onTouched',
    resolver: zodResolver(caughtFishSchema)
  });

  const {id} = useParams();

  const { fishingLures } = useFishingLure();
  const { fishSpecies } = useFishSpecies();
  const { createCaughtFish, updateCaughtFish, caughtFish } = useCaughtFish(id);
  const [selectedFishingLure, setSelectedFishingLure] = useState('');
  const [selectedFishSpecies, setSelectedFishSpecies] = useState('');
  const [addNote, setAddNote] = useState(false);

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFishSpecies(event.target.value);
  };

  const handleLureChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFishingLure(event.target.value);
  };

  useEffect(() => {
    if(caughtFish) reset(caughtFish); //reset form with existing caught fish data
  }, [caughtFish, reset]);

  const toggleAddNote = () => {
    setAddNote(!addNote);
  }

  const onSubmit = (data: CaughtFishSchema) => {

    console.log(data);
    // markerRef?.current?.closePopup();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full items-center'>
      <div className="w-[90%]">
        <label htmlFor='caughtDate' className="mb-1 block text-s font-small">Date</label>
        <input
          id='caughtDate'
          {...register('caughtDate')}
          type="date"
          className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
          // error={!!errors.title}
          // helperText={errors.title?.message}
        />
      </div>

      <div className="w-[90%]">
        <label htmlFor='fishSpecies' className="mb-1 block text-s font-small">Species </label>
        <select
          id='fishSpecies'
          {...register('fishSpecies')}
          value={selectedFishSpecies}
          onChange={handleSpeciesChange}
          className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
        >
          <option value="" disabled hidden>
            Choose...
          </option>
          {fishSpecies?.map((species) => (
            <option key={species.id} value={`/api/fish_species/${species.id}`}>{species.name}</option>
          ))}
        </select>
      </div>

      <div className="w-[90%]">
        <label htmlFor='fishingLure' className="mb-1 block text-s font-small">Lure</label>
        <select
          id='fishingLure'
          defaultValue=""
          {...register('fishingLure')}
          value={selectedFishingLure}
          onChange={handleLureChange}
          className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
        >
          <option value="" disabled hidden>
            Choose...
          </option>
          {fishingLures?.map((lure) => (
            <option key={lure.id} value={`/api/fishing_lures/${lure.id}`}>{lure.name}</option>
          ))}
        </select>
      </div>

      <div className="w-[90%]">
        <label htmlFor='length' className="mb-1 block text-s font-small">Length (Inches)</label>
        <input
          id='length'
          {...register('length')}
          type="number"
          className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
        />
      </div>

      <button className='cursor-pointer w-24 hover:text-forestyhover transition-colors' onClick={toggleAddNote} type='button'>{addNote ? 'Cancel' : 'Add Note'}</button>

      <div className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${addNote ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}>
        <label htmlFor='note' className="mb-1 block text-s font-small">Note</label>
        <textarea
          id='note'
          {...register('note')}
          className='w-full border border-[#e0e0e0] bg-white py-1 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md'
        />
      </div>

      <input type="hidden" {...register('latitude')} value={latitude} />
      <input type="hidden" {...register("longitude")} value={longitude} />
      <input type="hidden" {...register('caughtBy')} value='/api/users/67' /> {/* Temporary until auth is implemented */}

      <DefaultButton text={'Submit'} type='submit' />
    </form>
  )
}
