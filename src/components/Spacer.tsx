import { View } from "react-native";
interface SpacerProps {
  height: number;
}

const Spacer = ({ height }: SpacerProps) => <View style={{ height }}></View>;

export default Spacer;
