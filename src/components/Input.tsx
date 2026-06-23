import { StyleSheet, TextInput, Text, View } from "react-native";
import { colors, typography } from "@/src/theme";

const styles = StyleSheet.create({
  input: {
    ...typography.bodyText,
    color: colors.text,
    borderWidth: 0,
    width: "100%",
    borderColor: "transparent",
    backgroundColor: colors.primary5,
    borderRadius: 10,
    height: 44,
    paddingHorizontal: 10,
  },
  label: {
    ...typography.bodyText,
    color: colors.text,
    alignSelf: "flex-start",
    marginBlockEnd: 6,
    textIndent: "3px",
  },
});

interface Props extends React.ComponentProps<typeof TextInput> {
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: object;
}

const Input = (props: Props) => {
  const { style, ...rest } = props;
  return (
    <View style={{ ...style }}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={[
          styles.input,
          props.multiline && {
            height: props.numberOfLines ? props.numberOfLines * 20 : 44,
            paddingBlockStart: 8,
          },
        ]}
        {...rest}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholderTextColor={colors.neutral4}
      />
    </View>
  );
};

export default Input;
