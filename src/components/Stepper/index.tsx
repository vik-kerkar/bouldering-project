import { View, StyleSheet, Text } from "react-native";
import { colors } from "@/src/theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
    marginTop: 30,
    paddingHorizontal: 24,
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
  activeStep: {
    backgroundColor: colors.tertiary1,
    color: colors.secondary4,
  },
  activeStepText: {
    color: colors.secondary4,
  },
  activeLine: {
    backgroundColor: colors.tertiary1,
  },
});

const Stepper = () => {
  return (
    <View style={styles.container} testID="stepper">
      <View style={[styles.step, styles.activeStep]}>
        <Text style={[styles.stepText, styles.activeStepText]}>1</Text>
      </View>
      <View style={[styles.line]}></View>
      <View style={styles.step}>
        <Text style={styles.stepText}>2</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.step}>
        <Text style={styles.stepText}>3</Text>
      </View>
    </View>
  );
};

export default Stepper;
