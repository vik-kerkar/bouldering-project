import { View, Text } from "react-native";
import styles from "./styles";

import { useContext } from "react";
import { StepContext } from "../../context/stepContext";
import TickIcon from "@/assets/icons/tick.svg";

const Stepper = () => {
  const { step } = useContext(StepContext);
  return (
    <View style={styles.container} testID="stepper">
      <View style={[styles.step, step >= 1 ? styles.activeStep : {}]}>
        <Text style={[styles.stepText, step >= 1 ? styles.activeStepText : {}]}>
          {step > 1 ? <TickIcon /> : 1}
        </Text>
      </View>
      <View style={[styles.line, step >= 2 ? styles.activeLine : {}]}></View>
      <View style={[styles.step, step >= 2 ? styles.activeStep : {}]}>
        <Text style={[styles.stepText, step >= 2 ? styles.activeStepText : {}]}>
          {step > 2 ? <TickIcon /> : 2}
        </Text>
      </View>
      <View style={[styles.line, step >= 3 ? styles.activeLine : {}]}></View>
      <View style={[styles.step, step >= 3 ? styles.activeStep : {}]}>
        <Text style={[styles.stepText, step >= 3 ? styles.activeStepText : {}]}>
          3
        </Text>
      </View>
    </View>
  );
};

export default Stepper;
