import {
  StyleSheet,
  TextInput,
  Text,
  View,
  GestureResponderEvent,
  Pressable,
} from "react-native";
import { colors, typography } from "@/src/theme";

import * as Icons from "@/assets/icons";

const styles = StyleSheet.create({
  input: {
    ...typography.bodyText,
    color: colors.text,
    borderWidth: 0,
    width: "100%",
    borderColor: "transparent",
    backgroundColor: colors.primary5,
    borderRadius: 10,
    height: 50,
    paddingHorizontal: 10,
  },
  error: {
    borderWidth: 1,
    borderColor: colors.error,
  },
  disabled: {
    backgroundColor: colors.primary6,
    color: colors.neutral1,
  },
  label: {
    ...typography.bodyText,
    color: colors.text,
    alignSelf: "flex-start",
    marginBlockEnd: 6,
    textIndent: "3px",
  },
  icon: {
    position: "absolute",
    right: 10,
  },
});

interface Props extends React.ComponentProps<typeof TextInput> {
  label?: string;
  multiline?: boolean;
  numberOfLines?: number;
  style?: object;
  icon?: keyof typeof Icons;
  onIconPress?: (e: GestureResponderEvent) => void; // supports an optional icon
  hasError?: boolean;
}

const Input = (props: Props) => {
  const { style, icon, editable, onIconPress, hasError, ...rest } = props;
  const IconComponent = icon ? Icons[icon] : null;
  return (
    <View style={[{ ...style }, { position: "relative" }]}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <TextInput
        style={[
          styles.input,
          props.multiline && {
            height: props.numberOfLines ? props.numberOfLines * 20 : 44,
            paddingBlockStart: 8,
          },
          !editable && styles.disabled,
          hasError && styles.error,
        ]}
        {...rest}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        placeholderTextColor={colors.neutral4}
        editable={editable}
      />
      {IconComponent && (
        <Pressable
          onPress={onIconPress}
          testID="icon-button"
          style={{
            ...styles.icon,
            top: props.label ? 40 : 15,
          }}
        >
          <IconComponent />
        </Pressable>
      )}
    </View>
  );
};

export default Input;
