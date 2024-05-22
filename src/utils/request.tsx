import axios from "axios";
import { Sites, Urls } from "../../Config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const CancelToken = axios.CancelToken;
let instance = {};

async function Request(
  method : String,
  url_key : String,
  headers : Object,
  data : Object,
  args : Array,
  onSuccess : Function,
  onFailed : Function,
  extra: Object
) {
  try {
    let token = ''
    const storedUser = await AsyncStorage.getItem('@AuthenticationToken:Key');
    if (storedUser) token = JSON.parse(storedUser);

    if (typeof headers !== "object") {
      throw new Error("Invalid headers, headers must be an object");
    }

    if (!Array.isArray(args)) {
      throw new Error("Invalid arguments, data must be an array");
    }

    if (typeof onSuccess !== "function") {
      throw new Error("Invalid onSuccess, onSuccess must be a function");
    }

    if (typeof onFailed !== "function") {
      throw new Error("Invalid onFailed, onFailed must be a function");
    }

    if (typeof axios[method] !== "function") {
      throw new Error("Invalid method");
    }

    let api = Urls[url_key];
    if (!api) {
      throw new Error("Invalid url key");
    }

    args.forEach((value, index) => {
      api = api.replace("{}", value);
    });

    if (method === "get" && data) {
      data = {
        params: data
      };
    }

    headers = { ...headers, Authorization: 'Bearer ' + token.token };

    for (let header in headers) {
      axios.defaults.headers.common[header] = headers[header];
    }

    const response = await axios({
      method,
      url: Sites.HAN.API + api,
      data,
      cancelToken: new CancelToken(function executor(c) {
        instance.cancel = c;
      })
    });

    onSuccess(response.data, extra);
  } catch (error) {
    onFailed(error);
  }

  return instance;
}

export default Request;
