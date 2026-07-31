import { StyleSheet } from "react-native";
import { typography, colors } from "@/src/theme";
import globalStyles from "@/src/theme/globalStyles";

const styles = StyleSheet.create({
  title: {
    ...typography.heading2,
    paddingBottom: 8,
    color: colors.primary1,
  },
  imageContainer: globalStyles.imageContainer,
  image: globalStyles.image,
  description: {
    ...typography.bodyText,
  },
  container: {
    paddingBottom: 24,
  },
});

export default styles;
