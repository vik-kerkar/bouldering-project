import { useMutation } from "@tanstack/react-query";
import supabase from "@/app/supabase";
import { LocationData } from "../types";

export const useCreateDestination = () => {
  return useMutation({
    mutationFn: async (record: LocationData) => {
      const response = await supabase
        .from("Destination")
        .insert(record)
        .select();
      if (response.error) {
        return { error: response.error };
      }
      return response;
    },
  });
};

export default useCreateDestination;
