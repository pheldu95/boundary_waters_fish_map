import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { HydraCollection } from "../types";
import axios from "axios";
import type { CaughtFishFilters, CaughtFishRead, CaughtFishWrite } from "../types/caughtFishTypes";

export const useCaughtFishes = (filters?: CaughtFishFilters) => {
    const { data: caughtFishes, isLoading } = useQuery<CaughtFishRead[]>({
        queryKey: ['caughtFishes', 'paginated'],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<CaughtFishRead>>('/api/caught_fishes');
            return response.data.member;
        },
    });

    const { data: allCaughtFishes } = useQuery<CaughtFishRead[]>({
        queryKey: ['caughtFishes', 'all', filters],
        queryFn: async () => {
            const params: Record<string, string> = {
                pagination: 'false'
            };

            if (filters?.fishSpeciesId) {
                params['fishSpecies.id'] = filters.fishSpeciesId;
            }

            const queryString = new URLSearchParams(params).toString();
            const response = await axios.get<HydraCollection<CaughtFishRead>>(
                `/api/caught_fishes?${queryString}`
            );
            return response.data.member;
        },
    });

    return {
        caughtFishes,
        isLoading,
        allCaughtFishes
    };
}
export const useCaughtFish = (
    id?: string
) => {
    const queryClient = useQueryClient();

    // const { data: caughtFishes, isLoading } = useQuery<CaughtFishRead[]>({
    //     queryKey: ['caughtFishes', 'paginated'],
    //     queryFn: async () => {
    //         const response = await axios.get<HydraCollection<CaughtFishRead>>('/api/caught_fishes');
    //         return response.data.member;
    //     },
    // });

    // const { data: allCaughtFishes } = useQuery<CaughtFishRead[]>({
    //     queryKey: ['caughtFishes', 'all', filters],
    //     queryFn: async () => {
    //         const params: Record<string, string> = {
    //             pagination: 'false'
    //         };

    //         if (filters?.fishSpeciesId) {
    //             params['fishSpecies.id'] = filters.fishSpeciesId;
    //         }

    //         const queryString = new URLSearchParams(params).toString();
    //         const response = await axios.get<HydraCollection<CaughtFishRead>>(
    //             `/api/caught_fishes?${queryString}`
    //         );
    //         return response.data.member;
    //     },
    // });

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
        }
    });

    return {
        // caughtFishes,
        // allCaughtFishes,
        // isLoading,
        deleteCaughtFish,
        updateCaughtFish,
        createCaughtFish,
        caughtFish,
        isLoadingcaughtFish
    };
}