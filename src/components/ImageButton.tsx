import { Pressable, Image, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  navButton: {
    alignSelf: "center",
  },
  navButtonPrev: {
    transform: [{ scaleX: -1 }],
  },
  navButtonImage: {
    width: 110,
  },
});

type ButtonType =
  | "next"
  | "previous"
  | "reset"
  | "save"
  | "disabled"
  | "disabled-save";

interface ImageButtonProps {
  testID: string;
  onPress: () => void;
  disabled?: boolean;
  type: ButtonType;
}

const imageSources: Record<ButtonType, number> = {
  previous: require("@/assets/images/nav-button-prev.png"),
  reset: require("@/assets/images/nav-button-reset.png"),
  save: require("@/assets/images/nav-button-save.png"),
  disabled: require("@/assets/images/nav-button-disabled.png"),
  "disabled-save": require("@/assets/images/nav-button-disabled-save.png"),
  next: require("@/assets/images/nav-button-next.png"),
};

const ImageButton = (props: ImageButtonProps) => {
  const { testID, onPress, disabled, type } = props;

  return (
    <Pressable
      style={styles.navButton}
      testID={testID}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={imageSources[type]}
        style={styles.navButtonImage}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default ImageButton;
