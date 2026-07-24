import {
  SearchMode,
  Place,
  NewDestination,
  UploadedImage,
  Coordinate,
  ClimbingArea,
} from "../types";

export interface SearchState {
  searchMode: SearchMode;
  setSearchMode: (searchMode: SearchMode) => void;
  showAutocomplete: boolean;
  setShowAutocomplete: (show: boolean) => void;
}

export interface PlaceState {
  selectedPlace: Place | null;
  selectPlace: (place: Place | null) => void;
  newDestination: NewDestination | null;
  setNewDestination: (destination: NewDestination | null) => void;
}

export interface ImagesState {
  images: UploadedImage[] | null;
  setImages: (images: UploadedImage[] | null) => void;
}

export interface NewAreaState {
  newArea: Coordinate | null;
  setNewArea: (newArea: Coordinate | null) => void;
}

export interface ClimbingAreaState {
  climbingAreas: ClimbingArea[] | null;
  setClimbingAreas: (climbingAreas: ClimbingArea[] | null) => void;
}
