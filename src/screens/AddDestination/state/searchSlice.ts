import { SearchMode } from "../types";

export const createSearchSlice = (
  set: (
    partial: Partial<{ searchMode: SearchMode; showAutocomplete: boolean }>,
  ) => void,
) => ({
  searchMode: SearchMode.Destinations,
  setSearchMode: (searchMode: SearchMode) => set({ searchMode }),
  showAutocomplete: false,
  setShowAutocomplete: (show: boolean) => set({ showAutocomplete: show }),
});
