import { StyleSheet } from "react-native";
import globalStyles from "../../theme/globalStyles";

const styles = StyleSheet.create({
  headline: {
    ...globalStyles.heading1,
  },
  navButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBlockStart: 16,
  },
  navButton: {
    alignSelf: "center",
  },
  navButtonPrev: {
    transform: [{ scaleX: -1 }],
  },
  navButtonImage: {
    width: 110,
  },
  spacer: {
    height: 100,
  },
});

export default styles;
