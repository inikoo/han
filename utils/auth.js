import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Validate from "validate.js";

export default {
	async WriteCredential(data) {
		try {
			await AsyncStorage.setItem(
				"@AuthenticationToken:Key",
				JSON.stringify(data)
			);
		} catch (err) {
			Alert.alert(err.message);
		}
	},
	async GetCredential() {
		const value = await AsyncStorage.getItem("@AuthenticationToken:Key");

		if (Validate.isEmpty(value)) {
			return {
				username: null,
				token: null,
				refreshToken: null,
				isAuth: false,
				inAuth: false,
				props: {}
			};
		} else {
			return JSON.parse(value);
		}
	},
	async RemoveCredential() {
		await AsyncStorage.removeItem("@AuthenticationToken:Key");
	},
};