import { useQuery } from "@tanstack/react-query";
import supabase from "@/app/supabase";

export const useGetDestinations = () => {
  return useQuery({
    queryKey: ["destinations"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Destination")
        .select("*")
        .order("id");
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
