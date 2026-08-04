import { useQuery } from "@tanstack/react-query";
import supabase from "@/app/supabase";

export const useGetClimbingAreas = (destinationId: number) => {
  return useQuery({
    queryKey: ["climbingAreas" + destinationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("ClimbingArea")
        .select()
        .eq("destinationId", destinationId);
      if (error) {
        throw error;
      }
      return data;
    },
  });
};
