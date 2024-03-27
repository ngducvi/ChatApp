import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS } from "../types/authType";
import deCodeToken from "jwt-decode";

const authState = {
  loading: true,
  authenticate: false,
  error: "",
  successMessage: "",
  myInfo: "",
};

const tokenDecode = (token) => {
  const tokenDecoded = deCodeToken(token);
  const expTime = new Date(tokenDecoded.exp * 1000);
  // if token expired
  if (new Date() > expTime) {
    return null;
  }
  return tokenDecoded;
};

const loadToken = async () => {
  try {
    // await AsyncStorage.removeItem("authToken");
    const getToken = await AsyncStorage.getItem("authToken");
    if (getToken) {
      const getInfo = tokenDecode(getToken);
      if (getInfo) {
        authState.myInfo = getInfo;
        authState.authenticate = true;
        authState.loading = false;
      }
    }
  } catch (error) {
    console.error("Lỗi khi tải token:", error);
  }
};

loadToken();

export const authReducer = (state = authState, action) => {
  const { payload, type } = action;
  if (type === REGISTER_FAIL || type === LOGIN_FAIL) {
    return {
      ...state,
      error: payload.error,
      authenticate: false,
      myInfo: "",
      loading: true,
    };
  }

  if (type === REGISTER_SUCCESS || type === LOGIN_SUCCESS) {
    const myInfo = tokenDecode(payload.token);
    return {
      ...state,
      myInfo: myInfo,
      successMessage: payload.successMessage,
      error: "",
      authenticate: true,
      loading: false,
    };
  }
  return state;
};
