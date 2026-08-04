import { useContext } from "react";
import { FlatList, Image, View } from "react-native";

import { DestinationContext } from "../../context/destinationContext";
import styles from "./styles";

const Photos = () => {
  const destination = useContext(DestinationContext);

  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      data={destination?.imageUrls || []}
      numColumns={2}
      keyExtractor={(item) => item}
      renderItem={({ item, index }) => (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: item }}
            style={styles.image}
            accessible
            accessibilityRole="image"
            accessibilityLabel={`Destination photo ${index + 1}`}
          />
        </View>
      )}
    />
  );
};

export default Photos;
