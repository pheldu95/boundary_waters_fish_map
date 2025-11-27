import type { UseMutationResult } from "@tanstack/react-query";

type DeleteButtonProps<TArgs, TError = Error> = {
    itemId: TArgs;
    deleteMutation: UseMutationResult<void, TError, TArgs>;
};

export default function DeleteButton<TArgs, TError = Error>({
    itemId,
    deleteMutation,
}: DeleteButtonProps<TArgs, TError>) {
    return (
        <button
            className="w-full text-gray-900 bg-red-500 hover:bg-red-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 max-w-sm text-center cursor-pointer"
            // disabled={deleteMutation.isLoading}
            onClick={() => deleteMutation.mutate(itemId)}
        >
            Delete
            {/* {deleteMutation.isLoading ? "Deleting..." : buttonText} */}
        </button>
    );
}
