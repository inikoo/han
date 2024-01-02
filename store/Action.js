export default {
	CreateUserSessionProperties(payload) {
		return {
			type: "CreateUserSession",
			payload
		};
	},
};