import React, { useEffect, useReducer } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import supabase from "./supabase";
import { StatusBar } from "expo-status-bar";

import DestinationList from "../screens/DestinationList";
import { IDestination } from "../screens/DestinationList/types";

interface AppState {
  destinations?: IDestination[];
}

interface AppAction {
  type: "SET_DESTINATIONS";
  payload: IDestination[];
}

const MyStack = createNativeStackNavigator();

export default function App() {
  const reducer = (state: AppState, action: AppAction): AppState => {
    switch (action.type) {
      case "SET_DESTINATIONS":
        return { ...state, destinations: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    async function getDestinations() {
      let { data, error } = await supabase.from("Destination").select("*");
      if (error) {
        console.log("Error", error);
      }
      dispatch({ type: "SET_DESTINATIONS", payload: data as IDestination[] });
    }

    getDestinations();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <MyStack.Navigator>
        <MyStack.Screen
          name="Destinations"
          options={{ title: "Climbing App" }}
          component={() => (
            <DestinationList
              destinations={state.destinations as IDestination[]}
            />
          )}
        />
      </MyStack.Navigator>
    </>
  );
}
