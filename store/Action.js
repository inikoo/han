export default {
	CreateUserSessionProperties(payload) {
		return {
			type: "CreateUserSession",
			payload
		};
	},
	RemoveUserSessionProperties() {
		return {
			type: "RemoveUserSession",
			payload: {}
		};
	},
	UpdateUserSessionProperties(payload) {
		return {
			type: "UpdateUserSession",
			payload
		};
	},
	ToggleAuthSessionProperties(inAuth) {
		return {
			type: "AuthToggle",
			payload: inAuth
		};
	},
	StoreUserInformation(payload) {
		return {
			type: "StoreUserInformation",
			payload
		};
	},
	UpdateUserInformation(payload) {
		return {
			type: "UpdateUserInformation",
			payload
		};
	},
	StoreFromStorage(payload) {
		return {
			type: "StoreFromStorage",
			payload
		};
	},
	StoreUserInfoFromWeb(payload) {
		return {
			type: "StoreUserInfoFromWeb",
			payload
		};
	},
	SetNewNotification(payload) {
		return {
			type: "SetNewNotification",
			payload
		};
	},
	SetITagAS(payload) {
		return {
			type: "SetITagAS",
			payload
		};
	},
	SetMessageOutCounter(payload) {
		return {
			type: "SetMessageOutCounter",
			payload
		};
	},
	SetTenantConfig(payload) {
		return {
			type: "SetTenantConfig",
			payload
		};
	},
	StoreTenantConfigFromStorage(payload) {
		return {
			type: "StoreTenantConfigFromStorage",
			payload
		};
	}
};