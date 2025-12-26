import { useState, type ChangeEvent } from "react";
import DefaultButton from "../../components/buttons/DefaultButton"

type Props = {
    handleLengthFilterSubmit: (length: number) => void
}

export default function LengthFilter({ handleLengthFilterSubmit }: Props) {
    const [lengthValue, setLengthValue] = useState<number>(0);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLengthValue(Number(event.target.value));
    }

    return (
        <div>
            <input 
                type='number'
                value={lengthValue}
                onChange={handleChange}
                className="w-full border border-[#e0e0e0] bg-white py-3 px-6 text-base font-small text-grey outline-none focus:border-foresty focus:shadow-md"
            />
            <DefaultButton text='Filter' type='button' onClickProps={() => handleLengthFilterSubmit(lengthValue)}/>
        </div>
    )
}
