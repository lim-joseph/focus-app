import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { type ComponentProps } from 'react';

interface props { title: string | null }

export function Button({ title, onPress, style }: ComponentProps<typeof TouchableOpacity> & props) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.button, style]}
		>
			<Text style={[styles.buttonText]}>{title}</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	buttonText: {
		color: "white",
		fontSize: 16,
		lineHeight: 21,
		fontWeight: "bold",
		letterSpacing: 0.25,
		fontFamily: "sans-serif"
	},

	button: {
		backgroundColor: "#e9902c",
		height: 40,
		borderRadius: 20,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		elevation: 3,
	},
});

