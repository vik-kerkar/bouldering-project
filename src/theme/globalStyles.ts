import { StyleSheet } from "react-native";
import { typography, colors } from ".";

const globalStyles = StyleSheet.create({
  heading1: {
    ...typography.heading1,
    color: colors.primary1,
    marginVertical: 12,
  },
});

export default globalStyles;
