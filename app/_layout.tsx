import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    "PramukhRounded-Bold": require("../assets/fonts/PramukhRounded-Bold.otf"),
    "PramukhRounded-SemiBold": require("../assets/fonts/PramukhRounded-Semibold.otf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.otf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.otf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.otf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.otf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.otf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Index" />
    </Stack>
  );
}
