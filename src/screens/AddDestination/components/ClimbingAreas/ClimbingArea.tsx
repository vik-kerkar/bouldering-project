import { View, Text } from "react-native";
import { ClimbingArea as ICLimbingArea } from "../../types";
import { AreaMarkerIcon } from "@/assets/icons";
import styles from "./styles";

interface ClimbingAreaProps {
  area: ICLimbingArea;
}

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
