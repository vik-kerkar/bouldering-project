import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import DestinationList from "../src/screens/DestinationList";
import { colors } from "@/src/theme";
import AddDestination from "@/src/screens/AddDestination";
import DestinationDetails from "@/src/screens/DestinationDetails";

import { useAddDestinationStore } from "@/src/screens/AddDestination/state";

import { appStyles } from "@/src/theme/globalStyles";

import { confirmUndo } from "@/src/utils";

import {
  RootTabParamList,
  DestinationsStackParamList,
  Navigation,
  TabPressEvent,
} from "./types";

const MyTabs = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<DestinationsStackParamList>();

export default function App() {
  const selectedPlace = useAddDestinationStore((state) => state.selectedPlace);
  const resetState = useAddDestinationStore((state) => state.reset);

  const handleTabEvents = ({ navigation }: Navigation) => ({
    tabPress: async (e: TabPressEvent) => {
      const state = navigation.getState();

      const currentRoute = state.routes[state.index];
      const targetKey = e.target;

      if (currentRoute.name === "Add Destination" && selectedPlace) {
        e.preventDefault();

        const targetRoute = state.routes.find(
          (route) => route.key === targetKey,
        );

        const yes = await confirmUndo();
        if (!yes) {
          return;
        }
        resetState();
        navigation.navigate(targetRoute!.name as never);
      }
    },
  });

  return (
    <>
      <StatusBar style="dark" />
      <MyTabs.Navigator
        initialRouteName="Destinations"
        screenLayout={({ children }) => (
          <View style={appStyles.tabContainer}>{children}</View>
        )}
        screenOptions={{
          tabBarStyle: {
            backgroundColor: colors.primary4,
            paddingVertical: 10,
          },
        }}
        screenListeners={handleTabEvents}
      >
        <MyTabs.Screen
          name="Destinations"
          options={{
            headerShown: false,
            tabBarIcon: () => <Text style={appStyles.icon}>🧗‍♀️</Text>,
            tabBarButtonTestID: "destinations-tab",
            popToTopOnBlur: true,
            tabBarActiveBackgroundColor: colors.activeTabBackground,
          }}
        >
          {() => (
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              screenLayout={({ children }) => (
                <View style={appStyles.stackContainer}>{children}</View>
              )}
            >
              <Stack.Screen
                name="DestinationList"
                component={DestinationList}
              />
              <Stack.Screen
                name="DestinationDetails"
                component={DestinationDetails}
              />
            </Stack.Navigator>
          )}
        </MyTabs.Screen>
        <MyTabs.Screen
          name="Add Destination"
          options={{
            headerShown: false,
            tabBarIcon: () => <Text style={appStyles.icon}>⛰️</Text>,
            tabBarButtonTestID: "add-destination-tab",
            tabBarActiveBackgroundColor: colors.activeTabBackground,
          }}
        >
          {() => <AddDestination />}
        </MyTabs.Screen>
      </MyTabs.Navigator>
    </>
  );
}
