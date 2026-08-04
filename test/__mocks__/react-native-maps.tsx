import React, { ReactNode } from "react";
import { View } from "react-native";

const MockMapView = ({
  children,
  ...props
}: {
  children: ReactNode;
  [key: string]: any;
}) => (
  <View testID={props.testID} {...props}>
    {children}
  </View>
);

export const Marker = (props: { testID?: string; [key: string]: any }) => (
  <View testID={props.testID ?? "marker"} {...props}>
    {props.children}
  </View>
);

export const UrlTile = (props: { testID?: string; [key: string]: any }) => (
  <View testID="url-tile" {...props} />
);

export default MockMapView;
