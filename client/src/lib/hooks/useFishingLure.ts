import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { FishingLure, HydraCollection } from "../types";
import axios from "axios";
import type { FishingLureFilters } from "../types/fishingLureTypes";

export const useFishingLure = (
    filters?: FishingLureFilters,
    userId?: number
) => {
    const queryClient = useQueryClient();

    const { data: fishingLures, isPending } = useQuery<FishingLure[]>({
        queryKey: ['fishingLures', filters],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<FishingLure>>('/api/fishing_lures');
            return response.data.member;
        }
    })


    const { data: myFishingLures } = useQuery<FishingLure[]>({
        queryKey: ['myFishingLures', filters, userId],
        queryFn: async () => {
            const params: Record<string, string> = {
                pagination: 'false'
            };

            if (!userId) {
                throw new Error("user id is required to fetch user's lures");
            }
            params[`addedBy.id`] = userId.toString();

            const response = await axios.get<HydraCollection<FishingLure>>('/api/fishing_lures');
            return response.data.member;
        },
        enabled: !!userId
    })

    const createFishingLure = useMutation({
        mutationFn: async (fishingLure: FishingLure) => {
            await axios.post('/api/fishing_lures', fishingLure, {
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            })
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['myFishingLures']
            })
            await queryClient.invalidateQueries({
                queryKey: ['fishingLures']
            })
        }
    });

    const { data: fishingLureColors } = useQuery({
        queryKey: ['fishingLureColors'],
        queryFn: async () => {
            const response = await axios.get('/api/fishing_lure_colors');
            return response.data;
        }
    });

    return {
        fishingLures,
        isPending,
        myFishingLures,
        createFishingLure,
        fishingLureColors
    }
}