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
  onPress: (event: MapPressEvent) => void;
}
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    width: "100%",
    height: 300,
  },
  markerContainer: {
    alignItems: "center",
  },
  marker: {
    ...typography.markerText,
  },
});

const Map = (props: MapProps) => {
  const { latitude, longitude, destinationName, onPress, testID } = props;
  return (
    <MapView
      testID={testID}
      style={styles.container}
      mapType="satellite"
      provider={PROVIDER_GOOGLE}
      onPress={onPress}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
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
