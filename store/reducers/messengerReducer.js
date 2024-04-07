import { LOGOUT_SUCCESS } from "../types/authType";
import {
  ACCEPT_ADD_FRIEND,
  FRIEND_GET_SUCCESS,
  GET_MEMBER_SUCCESS,
  GET_REQUEST_ADD_FRIEND_SUCCESS,
  GROUPS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_SUCCESS_CLEAR,
  MESSAGE_SEND_SUCCESS,
  SEEN_MESSAGE,
  SOCKET_MESSAGE,
  SOCKET_MESSAGE_NEW,
  UPDATE,
} from "../types/messengerType";
const messengerState = {
  friends: [],
  message: [],
  members: [],
  groups: [],
  messageSendSuccess: false,
  messageGetSuccess: false,
  requestAddFriend: [],
};
export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;
  if (type === FRIEND_GET_SUCCESS) {
    return {
      ...state,
      friends: [...state.friends, ...payload.friends].sort((a, b) => new Date(b.msgInfo.createdAt) - new Date(a.msgInfo.createdAt)),
    };
  }
  if (type === MESSAGE_GET_SUCCESS) {
    return {
      ...state,
      message: payload.message,
      messageGetSuccess: true,
    };
  }
  if (type === GROUPS_GET_SUCCESS) {
    return {
      ...state,
      groups: payload.groups,
      friends: [...state.friends, ...payload.groups].sort((a, b) => new Date(b.msgInfo.createdAt) - new Date(a.msgInfo.createdAt)),
    };
  }
  if (type === MESSAGE_SEND_SUCCESS) {
    return {
      ...state,
      message: [...state.message, payload.message],
      messageSendSuccess: true,
    };
  }
  if (type === LOGOUT_SUCCESS) {
    return {
      friends: [],
      message: [],
      members: [],
      groups: [],
      requestAddFriend: [],
      messageSendSuccess: false,
      messageGetSuccess: false,
    };
  }
  return state;
};
