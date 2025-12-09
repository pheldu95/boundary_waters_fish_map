import { useQuery } from "@tanstack/react-query";
import type { HydraCollection } from "../../types";
import type { CaughtFishFilters, CaughtFishRead } from "../../types/caughtFishTypes";
import axios from "axios";


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