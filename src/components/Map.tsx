import MapView, {
  MapPressEvent,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import { MarkerIcon } from "@/assets/icons";
import { typography } from "../theme";

interface MapProps {
  testID: string;
  latitude: number;
  longitude: number;
  destinationName: string;
  children?: React.ReactNode;
  onPress?: (event: MapPressEvent) => void;
  zoomLevel?: number;
  height?: number;
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    ...typography.markerText,
  },
});

const Map = (props: MapProps) => {
  const {
    latitude,
    longitude,
    destinationName,
    onPress,
    testID,
    zoomLevel = -1,
    height = 270,
  } = props;

  const DEFAULT_DELTA = 0.005;
  const ZOOM_STEP = 0.001;
  const MIN_DELTA = 0.0005;

  const delta = Math.max(
    DEFAULT_DELTA - (zoomLevel + 1) * ZOOM_STEP,
    MIN_DELTA,
  );

  return (
    <MapView
      testID={testID}
      style={[styles.container, { height }]}
      mapType="satellite"
      provider={PROVIDER_GOOGLE}
      onPress={onPress}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: delta,
        longitudeDelta: delta,
      }}
    >
      <Marker
        testID="destination-marker"
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
      >
        <View style={styles.markerContainer}>
          <MarkerIcon width={27} height={27} fill={"#BDA89F"} />
          <Text style={styles.marker}>{destinationName}</Text>
        </View>
      </Marker>
      {props.children}
    </MapView>
  );
};

export default Map;
