import axios from "axios";
import { API_URL } from "../../environment/developer";
import {
  FRIEND_GET_SUCCESS,
  GET_MEMBER_SUCCESS,
  GET_REQUEST_ADD_FRIEND_SUCCESS,
  GROUPS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_SEND_SUCCESS,
  LEAVE_GROUP_SUCCESS,
  ADD_MEMBER_TO_GROUP_SUCCESS,
  CREATE_NEW_GROUP_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  RECALL_MESSAGE_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
} from "../types/messengerType";
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
      const response = await axios.get(
        `${API_URL}/api/get-friends/${id}`,
        config
      );
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
      const response = await axios.post(
        `${API_URL}/api/send-message`,
        data,
        config
      );
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
      const response = await axios.post(
        `${API_URL}/api/image-message-send`,
        data,
        config
      );
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

export const getRequestAddFriends = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${API_URL}/api/get-requestAddFriends`,
        config
      );

      dispatch({
        type: GET_REQUEST_ADD_FRIEND_SUCCESS,
        payload: {
          requestAddFriend: response.data.request, // Đảm bảo cấu trúc dữ liệu phù hợp
        },
      });
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.message);
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
        const response = await axios.get(
          `${API_URL}/api/get-message/${id}`,
          config
        );
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
        const response = await axios.get(
          `${API_URL}/api/get-message-group/${id}`,
          config
        );
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
export const createNewGroup = (data) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/api/create-new-group`,
        data,
        config
      );
      dispatch({
        type: CREATE_NEW_GROUP_SUCCESS,
        payload: {
          message: response.data.message,
        },
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
export const getGroupMembers = (id) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get( `${API_URL}/api/get-member-group/${id}`, config); 
      dispatch({
        type: GET_MEMBER_SUCCESS,
        payload: {
          members: response.data.members,
        },
      });
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
export const removeMember = (groupId, userId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${API_URL}/api/group/${groupId}/remove-member/${userId}`,
        config
      );
      if (response.data.success) {
        // Dispatch an action indicating success or handle it as needed
      } else {
        // Handle failure case
      }
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
export const addMembersToGroup = (groupId, newMembersId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${API_URL}/api/group/${groupId}/add-members`,
        newMembersId, 
        config
      );
      if (response.data.success) {
        dispatch({
          type: ADD_MEMBER_TO_GROUP_SUCCESS,
          payload: {
            message: response.data.message,
          },
        });
        return true;
      } else {
        // Handle failure case
        return false;
      }
    } else {
      console.log("Token not found");
      return false;
    }
  } catch (error) {
    console.log(error.response.data);
    return false;
  }
};
export const leaveGroup = (groupId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${API_URL}/api/leave-group/${groupId}`,
        config
      );
      if (response.data.success) {
        dispatch({
          type: LEAVE_GROUP_SUCCESS,
          payload: {
            groupId: groupId,
          },
        });
      } else {
        // Handle failure case
      }
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
export const disbandTheGroup = (groupId) => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.delete(
        `${API_URL}/api/disband-group/${groupId}`,
        config
      );
      if (response.data.success) {
        // Dispatch an action indicating success or handle it as needed
        // For example:
        dispatch({
          type: DISBAND_GROUP_SUCCESS,
          payload: {
            groupId: groupId,
          },
        });
      } else {
        // Handle failure case
      }
    } else {
      console.log("Token not found");
    }
  } catch (error) {
    console.log(error.response.data);
  }
};



