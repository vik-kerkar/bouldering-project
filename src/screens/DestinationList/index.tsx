import React from "react";

import { Text, FlatList, View } from "react-native";
import { IDestinationList } from "./types";

import DestinationCard from "../../components/DestinationCard";
import styles from "./styles";

const DestinationList = React.memo(function DestinationList(
  props: IDestinationList,
) {
  const { destinations } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.headline}>Climbing Destinations</Text>
      <FlatList
        data={destinations}
        renderItem={({ item }) => <DestinationCard {...item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </View>
  );
});

export default DestinationList;
