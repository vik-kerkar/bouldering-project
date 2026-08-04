import { ScrollView, View } from "react-native";
import { Map, AreaMarker } from "@/src/components";
import { useContext } from "react";
import { DestinationContext } from "../../context/destinationContext";
import { useGetClimbingAreas } from "../../api/useGetClimbingAreas";
import { ClimbingArea } from "@/src/components";
import strings from "@/src/constants/strings.json";

const Areas = () => {
  const destination = useContext(DestinationContext);
  const { destinationDetails } = strings;
  const { data: climbingAreas } = useGetClimbingAreas(destination?.id);

  return (
    <ScrollView style={{ marginBlockStart: 20 }}>
      <Map
        latitude={destination?.lat as number}
        longitude={destination?.long as number}
        destinationName={destination?.name as string}
        testID="destination-map"
        zoomLevel={-15}
        height={250}
      >
        {climbingAreas?.map((area, index) => (
          <AreaMarker key={index} area={area} />
        ))}
      </Map>
      <View accessible accessibilityLabel={destinationDetails.areas}>
        {climbingAreas?.map((area, index) => (
          <ClimbingArea key={index} area={area} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Areas;
