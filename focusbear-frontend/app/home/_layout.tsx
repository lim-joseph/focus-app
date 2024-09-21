import "@/global.css";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function HomeLayout() {
	return (
		<Stack>
			<Stack.Screen
				name="(tabs)"
				options={{ title: "Focusbear", headerShown: false }}
			/>
		</Stack>
	);
}
