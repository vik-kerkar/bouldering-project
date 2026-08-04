import { Pressable, StyleSheet, Text } from "react-native";
import { colors, typography } from "../theme";

interface ButtonProps {
  type: "primary" | "secondary";
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  primary: {},
  secondary: {
    backgroundColor: colors.secondary2,
    padding: 12,
    borderRadius: 8,
  },
  label: { ...typography.bodyText },
  disabled: {
    backgroundColor: "#D2D2D2",
    color: "#727272",
  },
});

const Button = ({
  type = "primary",
  label,
  onPress,
  disabled,
}: ButtonProps) => (
  <Pressable
    style={[styles[type], styles.boxShadow, disabled ? styles.disabled : {}]}
    onPress={onPress}
  >
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

export default Button;
