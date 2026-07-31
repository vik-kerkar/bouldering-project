import { StyleSheet } from "react-native";
import { typography, colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBlockStart: 20,
    paddingBlockEnd: 100,
    gap: 20,
  },
  section: {
    gap: 4,
  },
  label: {
    ...typography.heading3,
    color: colors.primary1,
    fontWeight: "600",
  },
  value: {
    ...typography.bodyText,
    color: colors.textSecondary,
  },
});

export default styles;
