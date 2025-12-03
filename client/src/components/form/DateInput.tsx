import { type Path, type UseFormRegister } from 'react-hook-form'
import type { CaughtFishSchema } from '../../lib/schemas/caughtFishSchema'

type InputProps = {
  label: string
  propertyName: Path<CaughtFishSchema>
  register: UseFormRegister<CaughtFishSchema>
  required: boolean
}

export default function DateInput({ label, register, required, propertyName }: InputProps) {
    return (
        <div className="w-[90%]">
            <label htmlFor='caughtDate' className="mb-1 block text-s font-small">{label}</label>
            <input
                id={propertyName}
                {...register(propertyName, {required})}
                type="date"
                className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
            />
        </div>
    )
}
