import { View, Text, StyleSheet } from "react-native";

import { colors, typography } from "@/src/theme";
import { CloseIcon, WarningIcon } from "@/assets/icons";

const styles = StyleSheet.create({
  closeIcon: {
    alignSelf: "flex-start",
    marginLeft: "auto",
  },
  message: {
    ...typography.bodyText,
  },
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
    borderRadius: 4,
    backgroundColor: colors.warning,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    height: 76,
  },
});

const Message = () => {
  return (
    <View style={styles.container}>
      <WarningIcon />
      <Text style={styles.message}>Destination already exists</Text>
      <CloseIcon style={styles.closeIcon} />
    </View>
  );
};

export default Message;
