export interface Place {
  id: string;
  name: string;
  state: string;
  country: string;
  lat: number;
  lon: number;
  county: string;
  district: string;
}

export interface Feature {
  properties: {
    place_id: string;
    city: string;
    address_line_1: string;
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
