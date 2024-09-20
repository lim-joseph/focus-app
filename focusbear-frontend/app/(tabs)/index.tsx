import React, { useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	TextInput,
	TouchableOpacity,
} from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Handle login with email and password
		console.log("Email:", email);
		console.log("Password:", password);
	};

	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/partial-react-logo.png")}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">🐻 FocusBear</ThemedText>
			</ThemedView>
			<ThemedView style={styles.stepContainer}>
				<ThemedText type="subtitle">Login</ThemedText>
				<TextInput
					style={styles.input}
					placeholder="Email"
					keyboardType="email-address"
					value={email}
					onChangeText={setEmail}
				/>
				<TextInput
					style={styles.input}
					placeholder="Password"
					secureTextEntry
					value={password}
					onChangeText={setPassword}
				/>
				<Button title="Login" onPress={handleLogin} />
				<TouchableOpacity
					style={styles.signupButton}
					onPress={() => {
						/* Handle sign up navigation */
					}}
				></TouchableOpacity>
			</ThemedView>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
		padding: 16,
	},
	reactLogo: {
		height: 178,
		width: 290,
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	input: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		paddingHorizontal: 8,
		marginBottom: 12,
		borderRadius: 4,
	},
	signupButton: {
		marginTop: 12,
	},
	signupText: {
		color: "#007BFF",
		textAlign: "center",
	},
});
