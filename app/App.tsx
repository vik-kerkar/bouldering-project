import React, { useEffect, useReducer } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import supabase from "./supabase";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import DestinationList from "../src/screens/DestinationList";
import { IDestination } from "../src/screens/DestinationList/types";
import { colors } from "@/src/theme";
import AddDestination from "@/src/screens/AddDestination";

interface AppState {
  destinations?: IDestination[];
}

interface AppAction {
  type: "SET_DESTINATIONS";
  payload: IDestination[];
}

const MyTabs = createBottomTabNavigator();

const styles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 40,
    alignItems: "stretch",
    paddingTop: 30,
  },
});

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
      const { data, error } = await supabase.from("Destination").select("*");
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
      <MyTabs.Navigator
        initialRouteName="Destinations"
        screenLayout={({ children }) => (
          <View style={styles.container}>{children}</View>
        )}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.primary4,
            paddingVertical: 10,
          },
        }}
      >
        <MyTabs.Screen
          name="Destinations"
          options={{
            headerShown: false,
            tabBarIcon: () => <Text style={styles.icon}>🧗‍♀️</Text>,
          }}
        >
          {() => (
            <DestinationList
              destinations={state.destinations as IDestination[]}
            />
          )}
        </MyTabs.Screen>
        <MyTabs.Screen
          name="Add Destinations"
          options={{
            headerShown: false,
            tabBarIcon: () => <Text style={styles.icon}>⛰️</Text>,
          }}
        >
          {() => <AddDestination />}
        </MyTabs.Screen>
      </MyTabs.Navigator>
    </>
  );
}
