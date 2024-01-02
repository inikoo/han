import { Auth } from "../utils";

const defaultReducer = {
	message: {
		inUnconfirmed: 0,
		outUnconfirmed: 0
	},
	insertTag: {
		isOpen: false,
		newTag: null,
		navigation: null,
		openQRScan: () => null
	}
};

export default {
	userReducer(state = {}, action) {
		console.log("reducer",state, action)
		switch (action.type) {
			case "CreateUserSession":
				state = {
					token: action.payload.token,
				};
				Auth.WriteCredential(state);
				break;
			}
		return state;
	},
};