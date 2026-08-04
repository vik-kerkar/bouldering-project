import { StyleSheet } from "react-native";
import globalStyles from "@/src/theme/globalStyles";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
  headline: {
    ...globalStyles.heading1,
    textAlign: "left",
    paddingInlineStart: 8,
  },
  container: {
    flex: 1,
    position: "relative",
    marginBlockStart: 20,
    overflow: "visible",
  },
  tabHeader: {
    backgroundColor: colors.secondary2,
    marginBlockStart: 25,
    flexDirection: "row",
    paddingVertical: 16,
    justifyContent: "flex-start",
    borderRadius: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
  },
  tabText: {
    color: colors.tertiary1,
    fontWeight: "600",
  },
  tabIndicator: {
    width: 40,
    height: 3,
    borderRadius: 2,
    backgroundColor: colors.tertiary1,
    position: "relative",
    top: 16,
  },
});

export default styles;
