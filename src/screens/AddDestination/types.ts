export interface Place {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  long: number;
  county: string;
  district: string;
}

export interface Feature {
  properties: {
    place_id: string;
    city: string;
    address_line1: string;
    state: string;
    country: string;
    lat: number;
    lon: number;
    county: string;
    county_district: string;
  };
}

export enum SearchMode {
  Destinations = "Destinations",
  Coordinates = "Coordinates",
}

export interface LocationData extends Omit<Place, "id"> {
  place_id: string;
  nearest_town_city: string;
  description: string;
  getting_there: string;
  misc_info?: string;
}

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

export interface NewDestination extends LocationData {
  url?: string;
}

export type UploadedImage = {
  assetId: string;
  fileName: string;
  uri: string;
  fileSize: number;
  default?: boolean;
};
