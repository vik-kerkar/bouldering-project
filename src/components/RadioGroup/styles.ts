import { StyleSheet } from "react-native";
import { colors, typography } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    width: "90%",
    gap: 0,
    marginVertical: 10,
  },
  buttonWrapper: {
    backgroundColor: "transparent",
    width: "50%",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary2,
  },
  borderLeft: {
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderRightWidth: 0,
  },
  borderRight: {
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderLeftWidth: 0,
  },
  label: {
    textAlign: "center",
    ...typography.linkText,
  },
  activeOption: {
    backgroundColor: colors.primary1,
  },
  activeLabel: {
    color: colors.secondary4,
  },
});

export default styles;
