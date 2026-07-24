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

const ImageButton = (props: ImageButtonProps) => {
  const { testID, onPress, disabled, type } = props;
  const getImgSrc = (type: ButtonType) => {
    switch (type) {
      case "previous":
        return require("@/assets/images/nav-button-prev.png");
      case "reset":
        return require("@/assets/images/nav-button-reset.png");
      case "save":
        return require("@/assets/images/nav-button-save.png");
      case "disabled":
        return require("@/assets/images/nav-button-disabled.png");
      case "disabled-save":
        return require("@/assets/images/nav-button-disabled-save.png");
      case "next":
      default:
        return require("@/assets/images/nav-button-next.png");
    }
  };
  return (
    <Pressable
      style={styles.navButton}
      testID={testID}
      onPress={onPress}
      disabled={disabled}
    >
      <Image
        source={getImgSrc(type)}
        style={styles.navButtonImage}
        resizeMode="contain"
      />
    </Pressable>
  );
};

export default ImageButton;
