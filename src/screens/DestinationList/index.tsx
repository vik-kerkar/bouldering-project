import React from "react";

import { Text, FlatList } from "react-native";
import { IDestinationList } from "./types";

import DestinationCard from "../../components/DestinationCard";
import styles from "./styles";
import strings from "../../constants/strings.json";

const DestinationList = React.memo(function DestinationList(
  props: IDestinationList,
) {
  const { destinations } = props;
  return (
    <>
      <Text style={styles.headline}>{strings.destinationList.headline}</Text>
      <FlatList
        data={destinations}
        renderItem={({ item }) => <DestinationCard {...item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </>
  );
});

export default DestinationList;
