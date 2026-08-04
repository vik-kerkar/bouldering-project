import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";

import * as Device from "expo-device";

import DestinationList from "../src/screens/DestinationList";
import AddDestination from "@/src/screens/AddDestination";
import DestinationDetails from "@/src/screens/DestinationDetails";

import { useAddDestinationStore } from "@/src/screens/AddDestination/state";

import styles from "./styles";

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

  const isTablet = Device.deviceType === Device.DeviceType.TABLET;

  const TabBarIcon = ({
    focused,
    children,
  }: {
    focused: boolean;
    children: React.ReactNode;
  }) => (
    <View
      style={[
        styles.iconContainer,
        focused && !isTablet && styles.activeIconContainer,
      ]}
    >
      {children}
    </View>
  );

  return (
    <>
      <StatusBar style="dark" />
      <MyTabs.Navigator
        initialRouteName="Destinations"
        screenLayout={({ children }) => (
          <View style={styles.tabContainer}>{children}</View>
        )}
        screenOptions={{
          tabBarStyle: styles.tabBar,
        }}
        screenListeners={handleTabEvents}
      >
        <MyTabs.Screen
          name="Destinations"
          options={{
            headerShown: false,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused}>
                <Text style={styles.icon}> 🧗‍♀️</Text>
              </TabBarIcon>
            ),
            tabBarButtonTestID: "destinations-tab",
            popToTopOnBlur: true,
          }}
        >
          {() => (
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              screenLayout={({ children }) => (
                <View style={styles.stackContainer}>{children}</View>
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
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ focused }) => (
              <TabBarIcon focused={focused}>
                <Text style={styles.icon}>⛰️</Text>
              </TabBarIcon>
            ),
            tabBarButtonTestID: "add-destination-tab",
          }}
        >
          {() => <AddDestination />}
        </MyTabs.Screen>
      </MyTabs.Navigator>
    </>
  );
}
