import { StyleSheet } from "react-native";
import { typography, colors } from ".";

const globalStyles = StyleSheet.create({
  heading1: {
    ...typography.heading1,
    color: colors.primary1,
    marginVertical: 12,
  },
});

export const appStyles = StyleSheet.create({
  icon: {
    fontSize: 24,
  },
  tabContainer: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 30,
    alignItems: "stretch",
    paddingTop: 30,
  },
  stackContainer: {
    backgroundColor: colors.background,
    flex: 1,
    alignItems: "stretch",
  },
});

export default globalStyles;
