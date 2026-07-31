import { View, Text, StyleSheet } from "react-native";

import { AreaMarkerIcon } from "@/assets/icons";
import { typography, colors } from "../theme";
import { ClimbingArea as IClimbingArea } from "@/src/screens/AddDestination/types";

interface ClimbingAreaProps {
  area: IClimbingArea;
}

const styles = StyleSheet.create({
  areaContainer: {
    marginVertical: 30,
    borderWidth: 1,
    borderColor: colors.neutral3,
    padding: 15,
    gap: 10,
  },
  areaTitle: {
    ...typography.heading3,
    color: colors.primary3,
  },
  areaLatLong: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  areaText: {
    ...typography.bodyText,
  },
});

const ClimbingArea = (props: ClimbingAreaProps) => {
  const { area } = props;
  return (
    <View style={styles.areaContainer}>
      <Text style={styles.areaTitle}>{area.areaName}</Text>
      <View style={styles.areaLatLong}>
        <AreaMarkerIcon width={27} height={27} />
        <Text style={styles.areaText}>
          {area.latitude}, {area.longitude}
        </Text>
      </View>
      <Text style={styles.areaText}>{area.areaDescription}</Text>
    </View>
  );
};

export default ClimbingArea;
