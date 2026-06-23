import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

interface RadioButtonGroupProps {
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

const RadioButtonGroup = ({
  options,
  selectedOption,
  onSelectOption,
}: RadioButtonGroupProps) => {
  return (
    <View style={styles.container}>
      {options.map((option, index) => {
        let borderStyle = {};
        if (index === 0) {
          borderStyle = styles.borderLeft;
        } else if (index === options.length - 1) {
          borderStyle = styles.borderRight;
        }
        return (
          <TouchableOpacity
            key={option}
            style={[
              styles.buttonWrapper,
              borderStyle,
              selectedOption === option ? styles.activeOption : {},
            ]}
            onPress={() => onSelectOption(option)}
          >
            <Text
              style={[
                styles.label,
                selectedOption === option ? styles.activeLabel : {},
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RadioButtonGroup;
