import {
  NavigatorScreenParams,
  EventArg,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

export type RootTabParamList = {
  Destinations: NavigatorScreenParams<DestinationsStackParamList>;
  "Add Destination": undefined;
};

export interface AppState {
  destinations?: Destination[];
}

export interface AppAction {
  type: "SET_DESTINATIONS";
  payload: Destination[];
}

export type DestinationsStackParamList = {
  DestinationList: undefined;
  DestinationDetails: {
    destinationId: number;
  };
};

export type Navigation = {
  navigation: NavigationProp<ParamListBase>;
};

export type TabPressEvent = EventArg<"tabPress", true>;

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

export interface DestinationLocation {
  placeId: string;
  nearestTownCity: string;
  description: string;
  gettingThere: string;
  miscInfo?: string;
}

export interface Destination extends Omit<Place, "id">, DestinationLocation {
  id: number;
  description: string;
  imageUrls: string[];
  defaultImgUrlIndex: number;
}
