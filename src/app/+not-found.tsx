import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function NotFoundScreen() {
	return (
		<>
			<Stack.Screen />
			<View style={styles.container}>
				<Link href={"/(tabs)"} style={styles.button}>
					Go back to home
				</Link>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red"
	},
	button: {
		fontSize: 20,
		textDecorationLine: "underline",
		color: "#fff"
	},
})