import { useQuery, UseQueryResult } from "@tanstack/react-query";

import supabase from "@/app/supabase";

interface CheckDestinationParams {
  placeId: string;
  lat: number;
  long: number;
}

const useCheckDestinationExists = ({
  placeId,
  lat,
  long,
}: CheckDestinationParams): UseQueryResult<boolean, Error> => {
  return useQuery({
    queryKey: [placeId, lat, long],
    queryFn: async () => {
      const filter = `placeId.eq.${placeId},or(lat.eq.${lat},long.eq.${long})`;

      const { data, error } = await supabase
        .from("Destination")
        .select()
        .or(filter)
        .limit(1);

      if (error) {
        return false;
      }
      return data?.length > 0;
    },
  });
};

export default useCheckDestinationExists;
