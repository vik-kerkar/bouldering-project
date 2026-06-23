import React from "react";
import { Text, View, Image } from "react-native";
import { IDestination } from "../../types";
import styles from "./styles";

const DestinationCard = React.memo(function Destination(props: IDestination) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.name}</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: props.url,
          }}
          style={styles.image}
        />
      </View>
      <Text style={styles.description}>{props.description}</Text>
    </View>
  );
});

export default DestinationCard;
