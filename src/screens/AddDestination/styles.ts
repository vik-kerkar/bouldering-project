import { StyleSheet } from "react-native";
import globalStyles from "../../theme/globalStyles";

const styles = StyleSheet.create({
  headline: {
    ...globalStyles.heading1,
  },
  navButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBlockStart: 26,
  },
});

export default styles;
