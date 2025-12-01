import React, { use, type FormEvent } from 'react'
import { useCaughtFish } from '../../lib/hooks/useCaughtFish'

export default function CaughtFishForm() {
  const { createCaughtFish } = useCaughtFish();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    //the name of each key come from the "name" property on each textfield
    const data: {[key: string]: FormDataEntryValue} = {}
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
  }
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-2'>
      <label>Date</label>
      <input name='caughtDate' type="text" />
      <label>Species </label>
      <input name='fishSpecies' type="text" />
      <label>Lure</label>
      <input name='fishingLure' type="text" />
      <button type="submit" className="w-full text-gray-900 bg-foresty focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 max-w-sm text-center cursor-pointer">
        Submit
      </button>
    </form>
  )
}
