import { type Path, type UseFormRegister, type FieldValues } from 'react-hook-form'

type InputProps<TFieldValues extends FieldValues> = {
    label: string;
    propertyName: Path<TFieldValues>;
    register: UseFormRegister<TFieldValues>;
    required: boolean;
    className?: string;
}

export default function TextAreaInput<TFieldValues extends FieldValues>({
    label,
    register,
    required,
    propertyName,
    className = ""
}: InputProps<TFieldValues>) {
    return (
        <div className={className}>
            <label htmlFor='note' className="mb-1 block text-s font-small">
                {label}
            </label>
            <textarea
                id={propertyName}
                {...register(propertyName, {required})}
                className='w-full border border-[#e0e0e0] bg-white py-1 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md'
            />
        </div>
    )
}