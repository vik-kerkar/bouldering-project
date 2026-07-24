import * as Icons from "@/assets/icons";
import { GestureResponderEvent, Pressable } from "react-native";

interface IconButtonProps {
  iconName: keyof typeof Icons;
  testID: string;
  onPress: (e: GestureResponderEvent) => void;
}

const IconButton = (props: IconButtonProps) => {
  const { iconName, testID, onPress } = props;
  const Icon = Icons[iconName];
  return (
    <Pressable testID={testID} onPress={onPress}>
      <Icon />
    </Pressable>
  );
};

export default IconButton;
