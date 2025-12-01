import { useQuery } from "@tanstack/react-query";
import type { Campsite, HydraCollection } from "../types";
import axios from "axios";

export const useCampsite = (id?: string) => {
    // const queryClient = useQueryClient();

    const { data: campsites, isPending } = useQuery<Campsite[]>({
        queryKey: ['campsites'],
        queryFn: async () => {
            const response = await axios.get<HydraCollection<Campsite>>('/api/campsites');
            return response.data.member;
        }
    })


    return {
        campsites,
        isPending,
    }
}