import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
  icon: {
    fontSize: 20,
    position: "relative",
    top: -8,
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
  iconContainer: {
    position: "relative",
    top: 12,
    width: 110,
    height: 50,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  activeIconContainer: {
    backgroundColor: colors.activeTabBackground,
  },
  tabBarLabel: {
    fontSize: 10,
    paddingBlockStart: 5,
  },
  tabBar: {
    backgroundColor: colors.primary4,
    paddingVertical: 10,
  },
});

export default styles;
