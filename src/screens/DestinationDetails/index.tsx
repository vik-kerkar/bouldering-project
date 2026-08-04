import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DestinationsStackParamList } from "@/app/types";

import { ImageCarousel } from "@/src/components";

import { Info, Photos, Areas } from "./components";

import { useGetDestination } from "./api/useGetDestination";
import styles from "./styles";

import { DestinationContext } from "./context/destinationContext";

type Props = NativeStackScreenProps<
  DestinationsStackParamList,
  "DestinationDetails"
>;
enum TabNames {
  Info = "Info",
  Photos = "Photos",
  Areas = "Areas",
}
const tabs = [TabNames.Info, TabNames.Photos, TabNames.Areas];

const DestinationDetails = ({ route }: Props) => {
  const { destinationId } = route.params;
  const { data: destination } = useGetDestination(destinationId);
  const [activeTab, setActiveTab] = useState<TabNames>(TabNames.Info);

  return (
    <View style={styles.container}>
      <Text style={styles.headline}>{destination?.name}</Text>
      <ImageCarousel images={destination?.imageUrls || []} />

      <View style={styles.tabHeader} accessible accessibilityRole="tablist">
        {tabs.map((tab, index) => (
          <Pressable
            key={index}
            style={styles.tabItem}
            onPress={() => setActiveTab(tab)}
            accessibilityRole="tab"
            accessibilityState={{ selected: activeTab === tab }}
          >
            <Text style={styles.tabText}>{tab}</Text>
            {activeTab === tab && <View style={styles.tabIndicator} />}
          </Pressable>
        ))}
      </View>
      <DestinationContext value={destination}>
        {activeTab === TabNames.Info && <Info />}
        {activeTab === TabNames.Photos && <Photos />}
        {activeTab === TabNames.Areas && <Areas />}
      </DestinationContext>
    </View>
  );
};

export default DestinationDetails;
