import { LOGOUT_SUCCESS } from "../types/authType";
import {
  ACCEPT_ADD_FRIEND,
  FRIEND_GET_SUCCESS,
  GET_MEMBER_SUCCESS,
  GET_REQUEST_ADD_FRIEND_SUCCESS,
  ADD_MEMBER_TO_GROUP_SUCCESS,
  CREATE_NEW_GROUP_SUCCESS,
  DELETE_MESSAGE_SUCCESS,
  LEAVE_GROUP_SUCCESS,
  GROUPS_GET_SUCCESS,
  MESSAGE_GET_SUCCESS,
  MESSAGE_GET_SUCCESS_CLEAR,
  MESSAGE_SEND_SUCCESS,
  SEEN_MESSAGE,
  SOCKET_MESSAGE,
  SOCKET_MESSAGE_NEW,
  RECALL_MESSAGE_SOCKET,
  RECALL_MESSAGE_SUCCESS,
  REMOVE_MEMBER_SUCCESS,
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

const mergeUniqueFriends = (arr1, arr2) => {
  // Tạo một Map để lưu trữ các đối tượng theo id
  let map = new Map();

  // Đưa các đối tượng từ arr1 vào map
  arr1.forEach((obj) => map.set(obj.fndInfo._id, obj));

  // Lặp qua các đối tượng từ arr2
  arr2.forEach((obj) => {
    // Nếu không có đối tượng nào trong map có cùng id, thêm vào map
    if (!map.has(obj.fndInfo._id)) {
      map.set(obj.fndInfo._id, obj);
    }
  });

  // Chuyển đổi map thành mảng các đối tượng
  let mergedArray = Array.from(map.values());

  return mergedArray;
};

export const messengerReducer = (state = messengerState, action) => {
  const { type, payload } = action;
  if (type === FRIEND_GET_SUCCESS) {
    const newList = mergeUniqueFriends(state.friends, payload.friends).sort((a, b) => new Date(b.msgInfo.createdAt) - new Date(a.msgInfo.createdAt));

    return {
      ...state,
      friends: newList,
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
  if (type === GET_MEMBER_SUCCESS) {
    return {
      ...state,
      members: payload.members,
    };
  }
  if (type === ACCEPT_ADD_FRIEND) {
    const newFriend = [{ fndInfo: payload, msgInfo: { createdAt: Date.now() } }];
    const newList = mergeUniqueFriends(state.friends, newFriend).sort((a, b) => new Date(b.msgInfo.createdAt) - new Date(a.msgInfo.createdAt));
    return {
      ...state,
      friends: newList,
      requestAddFriend: state.requestAddFriend.filter((u) => u._id !== payload._id),
    };
  }
  if (type === CREATE_NEW_GROUP_SUCCESS) {
    return {
      ...state,
      friends: [payload.message, ...state.friends],
    };
  }
  if (type === REMOVE_MEMBER_SUCCESS) {
    return {
      ...state,
      members: state.members.filter((m) => m.userId._id !== payload.message),
    };
  }
  if (type === LEAVE_GROUP_SUCCESS) {
    return {
      ...state,
      friends: state.friends.filter((f) => f.fndInfo._id !== payload.message),
    };
  }
  if (type === ADD_MEMBER_TO_GROUP_SUCCESS) {
    return {
      ...state,
      members: payload.message,
    };
  }
  if (type === RECALL_MESSAGE_SUCCESS) {
    //find message recall
    const index = state.message.findIndex((m) => m._id === payload.message._id);
    state.message[index].recall = true;

    //last message
    if (index === state.message.length - 1) {
      const conversationIndex = state.friends.findIndex((f) => f.fndInfo._id === payload.message.groupId || f.fndInfo._id === payload.message.receiverId);
      state.friends[conversationIndex].msgInfo.recall = true;
    }
    return { ...state };
  }

  if (type === DELETE_MESSAGE_SUCCESS) {
    //find message delete
    const index = state.message.findIndex((m) => m._id === payload.message._id);
    if (index >= 0) state.message[index].deletedBy = [payload.deletedBy];
    // if deleted message is last message
    if (index === state.message.length - 1) {
      const conversationIndex = state.friends.findIndex((f) => f.fndInfo._id === payload.message.groupId || f.fndInfo._id === payload.message.receiverId);
      state.friends[conversationIndex].msgInfo.deletedBy = [payload.deletedBy];
    }
    return { ...state };
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
