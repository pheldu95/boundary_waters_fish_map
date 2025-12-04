import { type UseFormRegister, type FieldValues, type Path } from 'react-hook-form';

type SelectOption = {
  value: string;
  label: string;
};

type SelectProps<TFieldValues extends FieldValues> = {
  label: string;
  propertyName: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  options: SelectOption[];
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export default function SelectInput<TFieldValues extends FieldValues>({
  label,
  propertyName,
  register,
  options,
  required = false,
  placeholder = "Select an option",
  className = "",
}: SelectProps<TFieldValues>) {
  return (
    <div className={className}>
      <label htmlFor={propertyName} className="mb-1 block text-s font-small">
        {label}
      </label>
      <select
        id={propertyName}
        {...register(propertyName, { required })}
        className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}