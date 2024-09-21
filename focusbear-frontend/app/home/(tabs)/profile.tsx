import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { Button } from "@/components/Button"

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useUser } from "@/hooks/useUser";

export default function Streaks() {
	const router = useRouter();
	const [morningStreak, setMorningStreak] = useState(0);
	const [eveningStreak, setEveningStreak] = useState(0);
	const { user } = useUser();
	console.log(user);
	const handleLogEntry = (routine: "morning" | "evening") => {
		if (routine === "morning") {
			setMorningStreak(morningStreak + 1);
		} else {
			setEveningStreak(eveningStreak + 1);
		}
	};

	return (
		<View style={styles.view}>
			<ThemedText type="title" style={styles.pageTitle}>
				User profile
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	view: {
		padding: 20
	},
	pageTitle: {
		fontSize: 25
	},
	bearLogo: {
		height: 30,
		width: 31,
		marginBottom: -4,
		marginRight: 10
	}
});
