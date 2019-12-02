import ChatsActionTypes from './chats.types';

// GET ALL USER CHATS
export const getAllUserChatsStart = callback => ({
  type: ChatsActionTypes.GET_ALL_USER_CHATS_START,
  callback
});

export const getAllUserChatsSuccess = userChats => ({
  type: ChatsActionTypes.GET_ALL_USER_CHATS_SUCCESS,
  payload: userChats
});

export const getAllUserChatsFailure = errorMessage => ({
  type: ChatsActionTypes.GET_ALL_USER_CHATS_FAILURE,
  payload: errorMessage
});

// GET CHAT ID
export const getChatIdStart = (opponentId, callback) => ({
  type: ChatsActionTypes.GET_CHAT_ID_START,
  payload: opponentId,
  callback
});

export const getChatIdSuccess = chatId => ({
  type: ChatsActionTypes.GET_CHAT_ID_SUCCESS,
  payload: chatId
});

export const getChatIdFailure = errorMessage => ({
  type: ChatsActionTypes.GET_CHAT_ID_FAILURE,
  payload: errorMessage
});

// CREATE GROUP
export const createGroupStart = (groupData, callback) => ({
  type: ChatsActionTypes.CREATE_GROUP_START,
  payload: groupData,
  callback
});

export const createGroupSuccess = userChats => ({
  type: ChatsActionTypes.CREATE_GROUP_SUCCESS,
  payload: userChats
});

export const createGroupFailure = errorMessage => ({
  type: ChatsActionTypes.CREATE_GROUP_FAILURE,
  payload: errorMessage
});

// UPLOAD MESSAGE IMAGE
export const uploadMessageImageStart = (imageFileName, image, callback) => ({
  type: ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_START,
  payload: { imageFileName, image },
  callback
});

export const uploadMessageImageSuccess = () => ({
  type: ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_SUCCESS
});

export const uploadMessageImageFailure = errorMessage => ({
  type: ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_FAILURE,
  payload: errorMessage
});
