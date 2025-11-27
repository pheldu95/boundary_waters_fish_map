import type { UseMutationResult } from "@tanstack/react-query";

type DeleteButtonProps<TArgs, TError = Error> = {
    itemId: TArgs;
    deleteMutation: UseMutationResult<void, TError, TArgs>;
};

export default function DeleteButton<TArgs, TError = Error>({
    itemId,
    deleteMutation,
}: DeleteButtonProps<TArgs, TError>) {
    const isDeleting = deleteMutation.isPending && deleteMutation.variables === itemId;

    return (
        <button
            className="w-full text-gray-900 bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 max-w-sm cursor-pointer disabled:opacity-50 flex items-center justify-center"
            disabled={isDeleting}
            onClick={() => deleteMutation.mutate(itemId)}
        >
            {isDeleting ? <div className="border-gray-300 h-10 w-10 animate-spin rounded-full border-8 border-t-pinkish" /> : "Delete"}
        </button>
    );
}
