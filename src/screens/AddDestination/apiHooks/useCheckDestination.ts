import { useQuery, UseQueryResult } from "@tanstack/react-query";

import supabase from "@/app/supabase";

const useCheckDestinationExists = (
  placeId: string,
): UseQueryResult<boolean, Error> => {
  return useQuery({
    queryKey: [placeId],
    queryFn: async () => {
      const response = await supabase
        .from("Destination")
        .select()
        .eq("place_id", placeId)
        .limit(1);

      if (response.error) {
        throw new Error(response.error?.message || "Error");
      }
      return response.data?.length > 0;
    },
  });
};

export default useCheckDestinationExists;
