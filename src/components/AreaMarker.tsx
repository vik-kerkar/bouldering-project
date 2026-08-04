import { Marker } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import { typography } from "../theme";
import { ClimbingArea } from "@/src/screens/AddDestination/types";

interface AreaMarkerProps {
  area: ClimbingArea;
  testID?: string;
}

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
  },
  areaMarker: {
    backgroundColor: "#2D7E33",
    width: 23,
    height: 23,
    opacity: 0.8,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#043001",
  },
  marker: {
    ...typography.markerText,
  },
});

const AreaMarker = ({ area, testID = "area-marker" }: AreaMarkerProps) => {
  return (
    <Marker
      testID={testID}
      coordinate={{
        latitude: area.latitude,
        longitude: area.longitude,
      }}
    >
      <View style={styles.markerContainer}>
        <View style={styles.areaMarker} />
        <Text style={styles.marker}>{area.areaName}</Text>
      </View>
    </Marker>
  );
};

export default AreaMarker;
