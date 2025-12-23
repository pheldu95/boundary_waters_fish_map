import { useQuery } from "@tanstack/react-query";
import type { FishingLure, HydraCollection } from "../types";
import axios from "axios";
import type { FishingLureFilters } from "../types/fishingLureTypes";

export const useFishingLure = (
    filters?: FishingLureFilters,
    userId?: number
) => {
    // const queryClient = useQueryClient();

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

            if(!userId) {
                throw new Error("user id is required to fetch user's lures"); 
            }
            params[`addedBy.id`] = userId.toString();

            const response = await axios.get<HydraCollection<FishingLure>>('/api/fishing_lures');
            return response.data.member;
        },
        enabled: !!userId
    })


    return {
        fishingLures,
        isPending,
        myFishingLures
    }
}