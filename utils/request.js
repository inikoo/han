import axios from "axios";
/* import RNFetchBlob from "rn-fetch-blob"; */
import validate from "validate.js";
import Urls from "../config/Urls";
import Sites from "../config/Sites";

const CancelToken = axios.CancelToken;
let api,
	parentArgs,
	instance = {};

function onError(error, extra, onFailed) {
	if (typeof error !== "undefined") {
		if (typeof error.response !== "undefined") {
			if (typeof error.response.data !== "undefined") {
				if (typeof error.response.data === "object") {
					onFailed(error, extra);
				} else {
				/* 	Modules.responseMessage("danger", "Wrong return from server!"); */
					onFailed({
						response: {
							data: {
								detail: "Wrong return from server!"
							}
						}
					});
				}
			}
		} else if (error.toString() === "Cancel") {
			onFailed({
				response: {
					data: {
						detail: error.message ? error.message : "Operation canceled!"
					}
				}
			});
		} else {
			onFailed({
				response: { data: { detail: "Connection to Server Failed!" } }
			});
		}
	}
}

function Request(
	method,
	url_key,
	headers = {},
	data = {},
	args = [],
	onSuccess = () => {},
	onFailed = () => {},
	extra = undefined
) {
	if (typeof headers !== "object") {
		throw "Invalid headers, headers must be an object";
	}

	if (!Array.isArray(args)) {
		throw "Invalid arguments, data must be an array";
	}

	if (typeof onSuccess !== "function") {
		throw "Invalid onSuccess, onSuccess must be a function";
	}

	if (typeof onFailed !== "function") {
		throw "Invalid onSuccess, onSuccess must be a function";
	}

	if (method === "get" && data) {
		data = {
			params: data
		};
	}

	if (typeof axios[method] !== "function") {
		throw "Invalid method";
	}

	api = Urls[url_key];
	if (!api) {
		throw "Invalid url key";
	}

	args.map((value, index) => {
		api = api.replace("{}", value);
	});

	parentArgs = arguments;

/* 	if (validate.isArray(data)) {
		RNFetchBlob.fetch(method, Sites.HAN.API + api, headers, data)
			.then(response => onSuccess(response.json(), extra))
			.catch(error => onError(error, extra, onFailed));
	} else { */
		for (let header in headers) {
			axios.defaults.headers.common[header] = headers[header];
		}
		console.log('res',Sites.HAN.API + api)
		axios[method](Sites.HAN.API + api, data, {
			cancelToken: new CancelToken(function executor(c) {
				instance.cancel = c;
			})
		})
			.then(response => onSuccess(response.data, extra))
			.catch(error => onFailed(error));
	/* } */
	return instance;
}

export default Request;