import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router";
import { Clock, Moon, Sun } from "lucide-react-native";

export default function Streaks() {
	const router = useRouter();
	const [morningStreak, setMorningStreak] = useState(0);
	const [eveningStreak, setEveningStreak] = useState(0);
	const { user } = useUser();

	const [leaderboard, setLeaderboard] = useState([
		{ id: "1", name: "User1", streak: 10 },
		{ id: "2", name: "User2", streak: 8 },
		{ id: "3", name: "User3", streak: 6 },
	]);

	console.log(user);

	const handleLogEntry = (routine: "morning" | "evening") => {
		if (routine === "morning") {
			setMorningStreak(morningStreak + 1);
		} else {
			setEveningStreak(eveningStreak + 1);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.card}>
				<View style={styles.bigIconContainer}>
					<Text style={styles.headerText}>Streaks</Text>
					<View style={styles.iconRow}>
						<View style={styles.streaksIconContainer}>
							<Sun size={24} />
							<Text>1</Text>
						</View>
						<View style={styles.streaksIconContainer}>
							<Moon size={24} />
							<Text>2</Text>
						</View>
						<View style={styles.streaksIconContainer}>
							<Clock size={24} />
							<Text>3</Text>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.card}>
				<Text style={styles.todayText}>Today</Text>
				<View style={styles.todayStreakContainer}>
					<View style={styles.todayStreakRow}>
						<Sun size={24} />
						<View style={styles.todayStreakBar}>
							<View
								style={[styles.todayStreakFill, { width: `${morningStreak}%` }]}
							/>
						</View>
					</View>
					<View style={styles.todayStreakRow}>
						<Moon size={24} />
						<View style={styles.todayStreakBar}>
							<View
								style={[styles.todayStreakFill, { width: `${eveningStreak}%` }]}
							/>
						</View>
					</View>
				</View>
			</View>

			<View style={styles.card}>
				<Text style={styles.leaderboardTitle}>Leaderboard</Text>
				<FlatList
					data={leaderboard}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<View style={styles.leaderboardItem}>
							<Text style={styles.leaderboardName}>{item.name}</Text>
							<Text style={styles.leaderboardStreak}>{item.streak}</Text>
						</View>
					)}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		padding: 20,
		backgroundColor: "white",
		borderColor: "#dddddd",
		borderWidth: 2,
		borderRadius: 10,
	},
	container: {
		marginHorizontal: 16,
		marginVertical: 32,
		flexDirection: "column",
		gap: 16,
	},
	streaksHeader: {
		paddingBottom: 24,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	headerText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	iconRow: {
		flexDirection: "row",
		gap: 24,
	},
	streaksIconContainer: {
		flexDirection: "row",
		gap: 6,
		alignItems: "center",
	},
	bigIconContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	todaySection: {
		paddingBottom: 32,
	},
	todayText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
	},
	todayStreakContainer: {
		flexDirection: "column",
		gap: 14,
	},
	todayStreakRow: {
		flexDirection: "row",
		gap: 8,
	},
	todayStreakBar: {
		flex: 1,
		height: 20,
		backgroundColor: "#e0e0e0",
		borderRadius: 10,
		overflow: "hidden",
		marginLeft: 8,
	},
	todayStreakFill: {
		height: "100%",
		backgroundColor: "#76c7c0",
	},
	leaderboardTitle: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 12,
	},
	leaderboardItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#d6d6d6",
	},
	leaderboardName: {
		fontSize: 18,
	},
	leaderboardStreak: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
