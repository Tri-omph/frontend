import { GestureHandlerRootView } from "react-native-gesture-handler";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import { SessionProvider } from "@/context/AuthContext";
import { ScanProvider } from "@/context/ScanContext";
import { BackgroundProvider } from "@/context/BackgroundContext";
import { PlayerProvider } from "@/context/PlayerContext";

// Import des "screens"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  /* SESSION PROVIDER, on garantit le contexte d'authentification à l'ensemble de l'application */
  /* GestureHandlerRootView, nous permet d'utiliser le bottom sheet (utile pour la partie scan) ! */
  return (
    <GestureHandlerRootView>
      <SessionProvider>
        <ScanProvider>
          <BackgroundProvider>
            <PlayerProvider>
              <RootLayoutNav />
            </PlayerProvider>
          </BackgroundProvider>
        </ScanProvider>
      </SessionProvider>
    </GestureHandlerRootView>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
