import React, { useEffect, useState } from 'react'
import { useCaughtFish } from '../../lib/hooks/caughtFish/useCaughtFish'
import { useFishingLure } from '../../lib/hooks/useFishingLure';
import { useFishSpecies } from '../../lib/hooks/useFishSpecies';
import DefaultButton from '../../components/buttons/DefaultButton';
import type { Marker } from 'leaflet';
import { useForm } from "react-hook-form";
import { useParams } from 'react-router';
import { caughtFishSchema, type CaughtFishSchema } from '../../lib/schemas/caughtFishSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import DateInput from '../../components/form/DateInput';
import SelectInput from '../../components/form/SelectInput';
import TextAreaInput from '../../components/form/TexaAreaInput';
import DefaultInput from '../../components/form/DefaultInput';
import { useAuth } from '../../AuthContext';

type Props = {
  latitude: number;
  longitude: number;
  markerRef?: React.RefObject<Marker | null>;
}

export default function CaughtFishForm({ latitude, longitude, markerRef }: Props) {
  const { user } = useAuth();
  const { register, reset, handleSubmit, formState: { errors } } = useForm<CaughtFishSchema>({
    mode: 'onTouched',
    resolver: zodResolver(caughtFishSchema),
    defaultValues: {
      caughtBy: user ? `/api/users/${user.id.toString()}` : '' //seems like a bad way to do this
    }
  });
  const { id } = useParams();
  const { fishingLures } = useFishingLure();
  const { fishSpecies } = useFishSpecies();
  const { createCaughtFish, updateCaughtFish, caughtFish } = useCaughtFish(id);
  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    if (caughtFish) reset({
      caughtDate: caughtFish.caughtDate,
      fishSpecies: caughtFish.fishSpecies.id.toString(),
      fishingLure: caughtFish.fishingLure.id.toString(),
      length: caughtFish.length,
      note: caughtFish.note,
      latitude: caughtFish.latitude,
      longitude: caughtFish.longitude,
      caughtBy: caughtFish.caughtBy
    }); //reset form with existing caught fish data
  }, [caughtFish, reset]);

  if (!fishSpecies || !fishingLures) {
    return <div>Loading...</div>; // or some loading component
  }
  //options to use for our select component
  const fishSpeciesOptions = fishSpecies.map(species => ({
    value: '/api/fish_species/' + species.id.toString(),
    label: species.name
  }));
  const fishingLureOptions = fishingLures.map(lure => ({
    value: '/api/fishing_lures/' + lure.id.toString(),
    label: lure.name
  }));

  const toggleAddNote = () => {
    setAddNote(!addNote);
  }

  const onSubmit = async (data: CaughtFishSchema) => {
    try {
      createCaughtFish.mutate(data);
    } catch (error) {
      console.log(error);
    }

    markerRef?.current?.closePopup();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full items-center'>
      <DateInput<CaughtFishSchema>
        label="Caught Date *"
        propertyName="caughtDate"
        register={register}
        required={true}
        className='w-[90%]'
      />

      <div className='w-[90%] flex'>
        <SelectInput<CaughtFishSchema>
          label="Fish Species *"
          propertyName="fishSpecies"
          register={register}
          options={fishSpeciesOptions}
          required={true}
          className='flex-1 pr-2'
        />
        <SelectInput<CaughtFishSchema>
          label="Fishing Lure"
          propertyName="fishingLure"
          register={register}
          options={fishingLureOptions}
          required={false}
          className='flex-1 pl-2'
        />
      </div>

      <DefaultInput
        label='Length'
        propertyName='length'
        register={register}
        required={false}
        className='w-[90%]'
        type='number'
      />

      <button className='cursor-pointer w-24 hover:text-forestyhover transition-colors' onClick={toggleAddNote} type='button'>{addNote ? 'Cancel' : 'Add Note'}</button>
      <TextAreaInput
        label="Note"
        propertyName="note"
        register={register}
        required={false}
        className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${addNote ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
      />

      <input type="hidden" {...register('latitude', { required: true })} value={latitude} />
      <input type="hidden" {...register('longitude', { required: true })} value={longitude} />

      <DefaultButton text={'Submit'} type='submit' />
    </form>
  )
}