import type { UseMutationResult } from "@tanstack/react-query";

type TrashCanButtonProps<TArgs, TError = Error> = {
    itemId: TArgs;
    deleteMutation: UseMutationResult<void, TError, TArgs>;
};
export default function TrashCanButton<TArgs, TError = Error>({
    itemId,
    deleteMutation,
}: TrashCanButtonProps<TArgs, TError>) {
    const isDeleting = deleteMutation.isPending && deleteMutation.variables === itemId;

    return (
        <button
            disabled={isDeleting}
            onClick={() => deleteMutation.mutate(itemId)}
            className="focus:outline-none disabled:opacity-50 flex items-center justify-center cursor-pointer"
        >
            {isDeleting ? 
                <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-pinkish" /> 
                : <i className="fas fa-trash text-xl w-10"></i>
            }
        </button>
    )
}
