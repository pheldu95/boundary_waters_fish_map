import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { User } from "../types";

export const useUser = (
    iri?: string
) => {
    // const queryClient = useQueryClient();

    const { data: user, isLoading: isLoadingUser } = useQuery({
        queryKey: ['user', iri],
        queryFn: async () => {
            if(!iri) {
                 throw new Error('IRI is required');
            }
            
            const response = await axios.get<User>(iri)
            return response.data;
        },
        enabled: !!iri //this means the function will only execute if we have an id
    });

    return {
        user,
        isLoadingUser
    };
}