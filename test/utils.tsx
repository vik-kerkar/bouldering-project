import React from "react";
import { NavigationContainer } from "@react-navigation/native";

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
