import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export function withStackNavigator<P extends React.JSX.IntrinsicAttributes>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  screens: { screenName: string; component: React.ComponentType<any> }[],
) {
  return function Component(props: P) {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            {screens.map((screen) => (
              <Stack.Screen
                key={screen.screenName}
                name={screen.screenName}
                component={screen.component}
              />
            ))}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  };
}

export function withNavigator(component: React.ReactElement) {
  return <NavigationContainer>{component}</NavigationContainer>;
}

export const withQueryClient = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{component}</QueryClientProvider>
  );
};
