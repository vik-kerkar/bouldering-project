import { StyleSheet } from "react-native";
import { typography, colors } from "../../theme";

const styles = StyleSheet.create({
  headline: {
    ...typography.heading1,
    color: colors.primary1,
    marginVertical: 12,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});

export default styles;
