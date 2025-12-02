import { useQuery } from "@tanstack/react-query";
import type { FishSpecies, HydraCollection } from "../types";
import axios from "axios";


export const useFishSpecies = () => {

    const { data: fishSpecies, isPending } = useQuery<FishSpecies[]>({
        queryKey: ['fishSpecies'],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<FishSpecies>>('/api/fish_species');
            return response.data.member;
        }
    })

    return {
        fishSpecies,
        isPending
    }
}