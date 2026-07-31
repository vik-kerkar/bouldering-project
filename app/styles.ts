import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
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

export default styles;
