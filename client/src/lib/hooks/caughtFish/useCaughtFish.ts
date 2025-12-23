import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { CaughtFishRead, CaughtFishWrite } from "../../types/caughtFishTypes";

export const useCaughtFish = (
    id?: string
) => {
    const queryClient = useQueryClient();

    const { data: caughtFish, isLoading: isLoadingcaughtFish } = useQuery({
        queryKey: ['caughtFishes', id],
        queryFn: async () => {
            const response = await axios.get<CaughtFishRead>(`/api/caught_fishes/${id}`)
            return response.data;
        },
        enabled: !!id //this means the function will only execute if we have an id
    });

    const deleteCaughtFish = useMutation({
        mutationFn: async (id: string) => {
            await axios.delete(`/api/caught_fishes/${id}`)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['caughtFishes']
            })
        }
    });

    const updateCaughtFish = useMutation({
        mutationFn: async (caughtFish: CaughtFishWrite) => {
            await axios.patch(`/api/caught_fishes/${caughtFish.id}`, caughtFish, {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['caughtFishes']
            })
        }
    });

    const createCaughtFish = useMutation({
        mutationFn: async (caughtFish: CaughtFishWrite) => {
            await axios.post(`/api/caught_fishes`, caughtFish, {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['caughtFishes']
            })
            await queryClient.invalidateQueries({
                queryKey: ['allCaughtFishes']
            })
        }
    });

    return {
        deleteCaughtFish,
        updateCaughtFish,
        createCaughtFish,
        caughtFish,
        isLoadingcaughtFish
    };
}