import { fishingLureSchema, type FishingLureSchema } from '../../lib/schemas/fishingLureSchema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DefaultButton from '../../components/buttons/DefaultButton';
import DefaultInput from '../../components/form/DefaultInput';
import { useAuth } from '../../AuthContext';
import { useFishingLure } from '../../lib/hooks/useFishingLure';
import SelectInput from '../../components/form/SelectInput';
import { Bounce, toast } from 'react-toastify';

type Props = {
    closeForm: () => void
}

export default function FishingLureForm({ closeForm }: Props) {
    const { user } = useAuth();
    const { createFishingLure, fishingLureColors } = useFishingLure();
    const { register, reset, handleSubmit, formState: { errors } } = useForm<FishingLureSchema>({
        mode: 'onTouched',
        resolver: zodResolver(fishingLureSchema),
        defaultValues: {
            addedBy: user ? `/api/users/${user.id.toString()}` : '' //seems like a bad way to do this
        }
    });

    const onSubmit = async (data: FishingLureSchema) => {
        if (!data.addedBy) {
            throw new Error('Error finding user to add to form data')
        }

        try {
            createFishingLure.mutate(data);
        } catch (error) {
            console.log(error);
        }

        closeForm();

        toast.success('New Lure Added!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 w-full items-center bg-secondary'>
                <DefaultInput
                    label='Name *'
                    propertyName='name'
                    register={register}
                    required={false}
                    className='w-[90%]'
                    type='text'
                />
                <SelectInput<FishingLureSchema>
                    label="Color"
                    propertyName='color'
                    register={register}
                    options={fishingLureColors}
                    required={true}
                />
                <DefaultButton text={'Submit'} type='submit' />
            </form>
        </>
    )
}
