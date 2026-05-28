import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/src/hooks/useDebounce";
import { SearchMode } from "./types";

export const useSearch = (query: string, mode: SearchMode) => {
  const url =
    mode === SearchMode.Coordinates
      ? process.env.EXPO_PUBLIC_REVERSE_GEOCODE_API_URL
      : process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_URL;
  const apiKey = process.env.EXPO_PUBLIC_AUTOCOMPLETE_API_KEY;

  const debouncedQuery = useDebounce(query, 300);

  return useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      // Coordinates mode
      if (mode === SearchMode.Coordinates) {
        // validate the query
        if (!validateCoordinates(query)) {
          return null;
        }
        // For coordinates, we need to call the Geocoding revere API
        const [lat, long] = query.replace(/\s/g, "").split(",");

        const response = await fetch(
          `${url}?lat=${lat}&lon=${long}&apiKey=${apiKey}&type=city`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch search results");
        }

        return response.json();
      }

      // Destinations mode
      if (!debouncedQuery || debouncedQuery.length < 3) {
        return null;
      }

      const response = await fetch(
        `${url}?text=${debouncedQuery}&apiKey=${apiKey}&type=city`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      return response.json();
    },
    enabled: !!debouncedQuery && debouncedQuery.length >= 3,
  });
};

export const validateCoordinates = (query: string) => {
  const coordRegex = /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/;
  return coordRegex.test(query.trim());
};
