import { Place, NewDestination } from "../types";

export const createPlaceSlice = (
  set: (
    partial: Partial<{
      selectedPlace: Place | null;
      newDestination: NewDestination | null;
    }>,
  ) => void,
) => ({
  selectedPlace: null,
  newDestination: null,
  selectPlace: (place: Place | null) => set({ selectedPlace: place }),
  setNewDestination: (destination: NewDestination | null) =>
    set({ newDestination: destination }),
});
