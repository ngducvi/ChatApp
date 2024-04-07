import axios from "axios";
import { API_URL } from "../../environment/developer";
import { FRIEND_GET_SUCCESS, GET_MEMBER_SUCCESS, GET_REQUEST_ADD_FRIEND_SUCCESS, GROUPS_GET_SUCCESS, MESSAGE_GET_SUCCESS, MESSAGE_SEND_SUCCESS } from "../types/messengerType";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getFriends = (id) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/get-friends/${id}`, config);
      dispatch({
        type: FRIEND_GET_SUCCESS,
        payload: {
          friends: response.data.friends,
        },
      });
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const messageSend = (data) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}/api/send-message`, data, config);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const imageMessageSend = (data) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(`${API_URL}/api/image-message-send`, data, config);
      dispatch({
        type: MESSAGE_SEND_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getGroups = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(`${API_URL}/api/get-groups`, config);
      dispatch({
        type: GROUPS_GET_SUCCESS,
        payload: {
          groups: response.data.groups,
        },
      });
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getMessage = (id) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/api/get-message/${id}`, config);
        dispatch({
          type: MESSAGE_GET_SUCCESS,
          payload: {
            message: response.data.message,
          },
        });
      } else {
        console.log("Token not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const getMessageGroup = (id) => {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${API_URL}/api/get-message-group/${id}`, config);
        dispatch({
          type: MESSAGE_GET_SUCCESS,
          payload: {
            message: response.data.message,
          },
        });
      } else {
        console.log("Token not found");
      }
    } catch (error) {
      console.log(error);
    }
  };
};
