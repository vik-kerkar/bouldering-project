import { StyleSheet } from "react-native";
import { typography, colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    // width: "100%",
    alignItems: "stretch",
    flexGrow: 1,
  },
  title: {
    ...typography.heading2,
    color: colors.primary1,
    marginBlockStart: 12,
    marginBlockEnd: 24,
    alignSelf: "center",
  },
  uploadContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 25,
    borderStyle: "dashed",
    gap: 8,
    marginBlockEnd: 32,
  },
  label: {
    ...typography.bodyText,
  },
  image: { width: 130, height: 130, margin: 10, borderRadius: 6 },
  defaultImage: {
    borderColor: "#00C3D0",
    borderWidth: 2,
  },
  deleteIcon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  validationError: {
    ...typography.bodyText,
    color: colors.error,
  },
});

export default styles;
