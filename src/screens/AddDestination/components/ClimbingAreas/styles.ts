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
  newAreaMarker: {
    backgroundColor: "#F4BC43",
    width: 23,
    height: 23,
    opacity: 0.7,
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#eb6315",
  },
  buttonContainer: {
    marginBlockStart: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 20,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: colors.neutral3,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBlockStart: 20,
    gap: 30,
  },
  areaContainer: {
    marginVertical: 30,
    borderWidth: 1,
    borderColor: colors.neutral3,
    padding: 15,
    gap: 10,
  },
  areaTitle: {
    ...typography.heading3,
    color: colors.primary3,
  },
  areaLatLong: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  areaText: {
    ...typography.bodyText,
  },
});

export default styles;
