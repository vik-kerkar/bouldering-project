import { Alert } from "react-native";

export const delay = (fn: () => void, ms: number) => {
  setTimeout(fn, ms);
};

export const confirmUndo = () =>
  new Promise<boolean>((resolve) => {
    Alert.alert("Discard Changes", "You have unsaved changes.", [
      {
        text: "Cancel",
        onPress: () => resolve(false),
        style: "cancel",
      },
      {
        text: "Discard",
        onPress: () => resolve(true),
        style: "destructive",
      },
    ]);
  });
