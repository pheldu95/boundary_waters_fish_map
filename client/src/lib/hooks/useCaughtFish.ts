import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CaughtFish } from "../types";

export const useCaughtFish = (id?: number) => {
    const queryClient = useQueryClient();

    const { data: caughtFishes, isLoading } = useQuery<CaughtFish[]>({
        queryKey: ['caughtFishes'],
        queryFn: async () => {
            const response = await fetch('/api/caught_fishes')
            if (!response.ok) {
                throw new Error('Network response was not ok')
            }

            const result = await response.json();

            return result.member ?? [];
        },
    });

    const deleteCaughtFish = useMutation<void, Error, number>({
        mutationFn: async (id) => {
            const res = await fetch(`/api/caught_fishes/${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete');
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['caughtFishes'] });
        },
    });

    return {
        caughtFishes,
        isLoading,
        deleteCaughtFish
    };
}