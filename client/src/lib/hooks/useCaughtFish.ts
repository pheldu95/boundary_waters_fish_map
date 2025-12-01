import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CaughtFish, HydraCollection } from "../types";
import axios from "axios";

export const useCaughtFish = (id?: number) => {
    const queryClient = useQueryClient();

    const { data: caughtFishes, isLoading } = useQuery<CaughtFish[]>({
        queryKey: ['caughtFishes', 'paginated'],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<CaughtFish>>('/api/caught_fishes');
            return response.data.member;
        },
    });

    const { data: allCaughtFishes } = useQuery<CaughtFish[]>({
        queryKey: ['caughtFishes', 'all'],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<CaughtFish>>('/api/caught_fishes?pagination=false');
            return response.data.member;
        },
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
        mutationFn: async (caughtFish: CaughtFish) => {
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
        mutationFn: async (caughtFish: CaughtFish) => {
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
        }
    });

    return {
        caughtFishes,
        allCaughtFishes,
        isLoading,
        deleteCaughtFish,
        updateCaughtFish,
        createCaughtFish
    };
}