import { Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DestinationsStackParamList } from "@/app/types";

import { useGetDestination } from "./api/useGetDestination";
type Props = NativeStackScreenProps<
  DestinationsStackParamList,
  "DestinationDetails"
>;
const DestinationDetails = ({ route }: Props) => {
  const { destinationId } = route.params;
  const { data: destination } = useGetDestination(destinationId);

  return (
    <View>
      <Text>{destination?.name}</Text>
      <Text>Info</Text>
      <Text>Photos</Text>
      <Text>Climbing Areas</Text>
    </View>
  );
};

export default DestinationDetails;
