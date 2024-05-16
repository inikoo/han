export default {
	CreateUserSessionProperties(payload : object) {
		return {
			type: "CreateClokingMachineSession",
			payload
		};
	},

	DestroyUserSessionProperties() {
		return {
			type: "DestroyClokingMachineSession",
		};
	},
};