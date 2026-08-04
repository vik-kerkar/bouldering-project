import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { DestinationsStackParamList, Destination } from "@/app/types";
type NavigationProp = BottomTabNavigationProp<
  DestinationsStackParamList,
  "DestinationList"
>;

const DestinationCard = React.memo(function Destination(props: Destination) {
  const defaultImageUrl = props.imageUrls[props.defaultImgUrlIndex];

  const navigator = useNavigation<NavigationProp>();

  const goToDestination = () => {
    navigator.navigate("DestinationDetails", {
      destinationId: props.id,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{`${props.name},${props.country}`}</Text>
      <View style={styles.imageContainer}>
        <Pressable
          onPress={goToDestination}
          accessibilityLabel={`${props.name} destination image`}
        >
          <Image
            source={{
              uri: defaultImageUrl,
            }}
            style={styles.image}
          />
        </Pressable>
      </View>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
});

export default DestinationCard;
