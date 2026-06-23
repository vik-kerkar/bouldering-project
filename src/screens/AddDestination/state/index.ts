import { create } from "zustand";
import { createSearchSlice } from "./searchSlice";
import { createPlaceSlice } from "./placeSlice";
import { createImagesSlice } from "./imagesSlice";
import type { SearchState, PlaceState, ImagesState } from "../types";

export const useAddDestinationStore = create<
  SearchState & PlaceState & ImagesState
>((set) => ({
  ...createSearchSlice(set),
  ...createPlaceSlice(set),
  ...createImagesSlice(set),
}));
