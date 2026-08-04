import { StyleSheet, Dimensions } from "react-native";
import { typography, colors } from ".";

const screenWidth = Dimensions.get("window").width;

const globalStyles = StyleSheet.create({
  heading1: {
    ...typography.heading1,
    color: colors.primary1,
    marginVertical: 12,
  },
  image: {
    aspectRatio: 13 / 8,
    width: "100%",
    height: "auto",
    borderRadius: 8,
  },
  imageContainer: {
    position: "relative",
    width: screenWidth - 60,
    shadowColor: "#000000",
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default globalStyles;
