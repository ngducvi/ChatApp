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
  return state;
};
