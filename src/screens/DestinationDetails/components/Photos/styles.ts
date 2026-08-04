import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBlockStart: 20,
    paddingBlockEnd: 100,
  },
  imageContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {
      width: -2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 13 / 8,
    borderRadius: 8,
    backgroundColor: colors.cardBackground,
  },
});

export default styles;
