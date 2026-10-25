import { ThemeProvider, useTheme } from "@/context/ThemeContext";
import { Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import { Lora_700Bold, useFonts } from "@expo-google-fonts/lora";
import { NunitoSans_400Regular, NunitoSans_700Bold } from "@expo-google-fonts/nunito-sans";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

function Inner() {
  const { scheme, colors } = useTheme();
  return (
    <>
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
      
    </>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    Lora_700Bold,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (loaded) SplashScreen.hideAsync();
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  );
}