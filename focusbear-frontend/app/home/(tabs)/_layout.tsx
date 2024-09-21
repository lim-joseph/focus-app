import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
	const colorScheme = useColorScheme();
	const { user } = useAuth();

	// if (!user) {
	//   router.push("/");
	// }

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.light.tint,
				headerShown: false,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: "Dashboard",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "home" : "home-outline"}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="streak"
				options={{
					title: "Streak",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "flame" : "flame-outline"}
							color={color}
						/>
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, focused }) => (
						<TabBarIcon
							name={focused ? "person-circle" : "person-circle-outline"}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}
