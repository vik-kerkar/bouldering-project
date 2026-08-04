import { create } from "zustand";

import { createSearchSlice } from "./searchSlice";
import { createPlaceSlice } from "./destinationSlice";
import { createImagesSlice } from "./imagesSlice";
import { createClimbingAreaSlice } from "./climbingAreaSlice";

import { SearchMode } from "../types";

import type {
  SearchState,
  PlaceState,
  ImagesState,
  NewAreaState,
  ClimbingAreaState,
} from "./types";

const initialState = {
  newDestination: null,
  selectedPlace: null,
  images: null,
  climbingAreas: null,
  newArea: null,
  searchMode: SearchMode.Destinations,
};

export const useAddDestinationStore = create<
  SearchState &
    PlaceState &
    ImagesState &
    NewAreaState &
    ClimbingAreaState & { reset: () => void }
>((set) => ({
  ...createSearchSlice(set),
  ...createPlaceSlice(set),
  ...createImagesSlice(set),
  ...createClimbingAreaSlice(set),
  reset: () => set(initialState),
}));
