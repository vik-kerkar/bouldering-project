import { StyleSheet } from "react-native";
import { typography, colors } from "../../theme";

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    paddingBottom: 8,
    color: colors.primary1,
  },
  imageContainer: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 8,
    marginBottom: 8,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 12,
    height: "auto",
    borderRadius: 8,
  },
  description: {
    ...typography.bodyText,
  },
  container: {
    paddingBottom: 24,
  },
});

export default styles;
