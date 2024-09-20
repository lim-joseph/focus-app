import "@/global.css";
import {DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import "react-native-reanimated";

import {useColorScheme} from "@/hooks/useColorScheme";
import {AuthContext} from "@/store/AuthContext";
import {BaseUser} from "@/hooks/useUser";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Load fonts
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  // Manage user state here
  const [user, setUser] = useState<BaseUser | null>(null);

  // Debug: Log user value to check if it updates
  console.log("context user", user);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <AuthContext.Provider value={{user, setUser}}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
