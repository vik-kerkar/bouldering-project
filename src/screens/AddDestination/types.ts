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
  placeId: string;
  nearestTownCity: string;
  description: string;
  gettingThere: string;
  miscInfo?: string;
}

export interface NewDestination extends LocationData {
  url?: string;
  defaultImgUrlIndex?: number;
  imageUrls?: string[];
}

export type UploadedImage = {
  assetId: string;
  fileName: string;
  uri: string;
  fileSize: number;
  default?: boolean;
  mimeType: string;
};

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface ClimbingArea extends Coordinate {
  areaName: string;
  areaDescription: string;
}

export type UploadFn = (
  uri: string,
  bucket: string,
  path: string,
  mimeType?: string,
) => Promise<string>;
