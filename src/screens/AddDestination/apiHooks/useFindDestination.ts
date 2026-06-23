import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/src/hooks/useDebounce";
import { SearchMode } from "../types";
import { validateCoordinates } from "../components/SearchDestination/module";

export const useFindDestinations = (query: string, mode: SearchMode) => {
  const url =
    mode === SearchMode.Destinations
      ? process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_URL
      : process.env.EXPO_PUBLIC_REVERSE_GEOCODE_API_URL;

  const apiKey = process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_KEY;

  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: [debouncedQuery],
    queryFn: async () => {
      let response;
      if (mode === SearchMode.Destinations) {
        // Destinations mode
        if (!debouncedQuery || debouncedQuery.length < 3) {
          return null;
        }

        response = await fetch(
          `${url}?text=${debouncedQuery}&apiKey=${apiKey}&type=city`,
        );
      } else {
        // Coordinates mode
        // validate the query
        if (!validateCoordinates(query)) {
          return null;
        }
        // For coordinates, we need to extract the coordinates
        const [lat, long] = query.replace(/\s/g, "").split(",");

        response = await fetch(
          `${url}?lat=${lat}&lon=${long}&apiKey=${apiKey}&type=city`,
        );
      }

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      return response.json();
    },
    enabled: !!debouncedQuery && debouncedQuery.length >= 3,
    retry: false,
  });
};
