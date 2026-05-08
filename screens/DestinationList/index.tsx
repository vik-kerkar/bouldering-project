import React from "react";
import { Text, FlatList, View, Image } from "react-native";
import { IDestinationList, IDestination } from "./types";

const Destination = React.memo(function Destination(props: IDestination) {
  return (
    <View>
      <Text>{props.name}</Text>
      <Image
        source={{
          uri: props.url,
        }}
        style={{ width: 200, height: 200 }}
      />
      <Text>{props.description}</Text>
    </View>
  );
});

const DestinationList = React.memo(function DestinationList(
  props: IDestinationList,
) {
  const { destinations } = props;

  console.log("Destinations", destinations);

  return (
    <>
      <Text
        style={{
          fontFamily: "PramukhRounded-Bold",
          fontSize: 40,
          textTransform: "uppercase",
        }}
      >
        Climbing Destinations
      </Text>
      <FlatList
        data={destinations}
        renderItem={({ item }) => <Destination {...item} />}
        keyExtractor={(item) => String(item.id)}
      />
    </>
  );
});

export default DestinationList;
