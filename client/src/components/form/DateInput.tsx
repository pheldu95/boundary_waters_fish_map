import { type Path, type UseFormRegister, type FieldValues } from 'react-hook-form'

type InputProps<TFieldValues extends FieldValues> = {
  label: string;
  propertyName: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  required: boolean;
  className?: string;
}

export default function DateInput<TFieldValues extends FieldValues>({ 
  label, 
  register, 
  required, 
  propertyName,
  className = "" 
}: InputProps<TFieldValues>) {
    return (
        <div className={className}>
            <label htmlFor={propertyName} className="mb-1 block text-s font-small">
                {label}
            </label>
            <input
                id={propertyName}
                {...register(propertyName, { required })}
                type="date"
                className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
            />
        </div>
    )
}