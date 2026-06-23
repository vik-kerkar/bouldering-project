import { StyleSheet } from "react-native";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 40,
    marginBlockEnd: 32,
    paddingHorizontal: 12,
    zIndex: 1,
  },

  step: {
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.tertiary3,
  },
  stepText: {
    color: colors.text,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: colors.tertiary3,
  },
  activeLine: {
    backgroundColor: colors.tertiary1,
  },
  activeStep: {
    backgroundColor: colors.tertiary1,
    color: colors.secondary4,
  },
  activeStepText: {
    color: colors.secondary4,
  },
});

export default styles;
