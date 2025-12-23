import { useQuery } from "@tanstack/react-query";
import type { HydraCollection } from "../../types";
import type { CaughtFishFilters, CaughtFishRead } from "../../types/caughtFishTypes";
import axios from "axios";


export const useCaughtFishes = (
    filters?: CaughtFishFilters,
    userId?: number
) => {
    const { data: caughtFishes, isLoading } = useQuery<CaughtFishRead[]>({
        queryKey: ['caughtFishes', 'paginated', userId],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<CaughtFishRead>>('/api/caught_fishes');
            return response.data.member;
        },
        enabled: !!userId
    });

    const { data: allCaughtFishes } = useQuery<CaughtFishRead[]>({
        queryKey: ['caughtFishes', 'all', filters, userId],
        queryFn: async () => {
            const params: Record<string, string> = {
                pagination: 'false'
            };

            if (filters?.fishSpeciesIds) {
                filters.fishSpeciesIds.forEach((id, index) => {
                    params[`fishSpecies.id[${index}]`] = id; // adding the index lets me add multiple &fishSpecies.id= to the queryString
                });
            }
            if (filters?.fishingLureIds) {
                filters.fishingLureIds.forEach((id, index) => {
                    params[`fishingLure.id[${index}]`] = id; // adding the index lets me add multiple &fishSpecies.id= to the queryString
                });
            }

            if(!userId) {
                throw new Error('user id is required to fetch caught fish'); 
            }
            params[`caughtBy.id`] = userId.toString();

            const queryString = new URLSearchParams(params).toString();
            const response = await axios.get<HydraCollection<CaughtFishRead>>(
                `/api/caught_fishes?${queryString}`
            );
            return response.data.member;
        },
        enabled: !!userId
    });

    return {
        caughtFishes,
        isLoading,
        allCaughtFishes
    };
}