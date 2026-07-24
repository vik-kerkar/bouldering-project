import { useQuery, UseQueryResult } from "@tanstack/react-query";

import supabase from "@/app/supabase";

const useCheckDestinationExists = (
  placeId: string,
): UseQueryResult<boolean, Error> => {
  return useQuery({
    queryKey: [placeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("Destination")
        .select()
        .eq("placeId", placeId)
        .limit(1);

      if (error) {
        return false;
      }
      return data?.length > 0;
    },
  });
};

export default useCheckDestinationExists;
