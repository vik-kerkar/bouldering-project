import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";

import strings from "@/src/constants/strings.json";
import { DestinationContext } from "../../context/destinationContext";
import styles from "./styles";

const { info } = strings.destinationDetails;

const Info = () => {
  const destination = useContext(DestinationContext);

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.section}>
        <Text style={styles.label}>{info.gpsCoordinates}</Text>
        <Text style={styles.value}>
          {destination?.lat}, {destination?.long}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{info.nearestTownCity}</Text>
        <Text style={styles.value}>{destination?.nearestTownCity}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{info.aboutThePlace}</Text>
        <Text style={styles.value}>{destination?.description}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.label}>{info.howToGetThere}</Text>
        <Text style={styles.value}>{destination?.gettingThere}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>{info.bestTimeToClimb}</Text>
        <Text style={styles.value}>{destination?.miscInfo}</Text>
      </View>
    </ScrollView>
  );
};

export default Info;
