import { StyleSheet } from "react-native";
import { typography, colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexGrow: 1,
  },
  title: {
    ...typography.heading2,
    color: colors.primary1,
    marginBlockEnd: 24,
    alignSelf: "center",
  },
});

export default styles;
