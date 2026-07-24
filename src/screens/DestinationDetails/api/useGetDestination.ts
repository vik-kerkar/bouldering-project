import { useQuery } from "@tanstack/react-query";
import supabase from "@/app/supabase";

export const useGetDestination = (destinationId: number) => {
  return useQuery({
    queryKey: ["destinationDetails"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Destination")
        .select()
        .eq("id", destinationId)
        .single();
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
