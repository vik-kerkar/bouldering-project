import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function withNavigation<P extends React.JSX.IntrinsicAttributes>(
  Component: React.FC,
) {
  return (props: P) => (
    <>
      <NavigationContainer>
        <Component {...props} />
      </NavigationContainer>
    </>
  );
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
