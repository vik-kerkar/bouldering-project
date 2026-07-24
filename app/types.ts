import {
  NavigatorScreenParams,
  EventArg,
  NavigationProp,
  ParamListBase,
} from "@react-navigation/native";

import { IDestination } from "../src/screens/DestinationList/types";

export type RootTabParamList = {
  Destinations: NavigatorScreenParams<DestinationsStackParamList>;
  "Add Destination": undefined;
};

export interface AppState {
  destinations?: IDestination[];
}

export interface AppAction {
  type: "SET_DESTINATIONS";
  payload: IDestination[];
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
