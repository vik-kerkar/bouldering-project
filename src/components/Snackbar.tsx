import { Snackbar, PaperProvider } from "react-native-paper";

interface SnackbarProps {
  visible: boolean;
  message: string;
  onDismiss?: () => void;
  action?: {
    label: string;
    onPress: () => void;
  };
}

const SnackbarComponent = ({
  visible,
  message,
  onDismiss = () => void 0,
  action,
}: SnackbarProps) => {
  return (
    <PaperProvider>
      <Snackbar visible={visible} onDismiss={onDismiss} action={action}>
        {message}
      </Snackbar>
    </PaperProvider>
  );
};

export default SnackbarComponent;
