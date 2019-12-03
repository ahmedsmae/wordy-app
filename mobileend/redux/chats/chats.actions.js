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

// GET CHAT BY ID
export const getChatByIdStart = (chatId, callback) => ({
  type: ChatsActionTypes.GET_CHAT_BY_ID_START,
  payload: chatId,
  callback
});

export const getChatByIdSuccess = chat => ({
  type: ChatsActionTypes.GET_CHAT_BY_ID_SUCCESS,
  payload: chat
});

export const getChatByIdFailure = errorMessage => ({
  type: ChatsActionTypes.GET_CHAT_BY_ID_FAILURE,
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

// UPDATE GROUP INFO
export const updateGroupInfoStart = (groupData, callback) => ({
  type: ChatsActionTypes.UPDATE_GROUP_INFO_START,
  payload: groupData,
  callback
});

export const updateGroupInfoSuccess = userChats => ({
  type: ChatsActionTypes.UPDATE_GROUP_INFO_SUCCESS,
  payload: userChats
});

export const updateGroupInfoFailure = errorMessage => ({
  type: ChatsActionTypes.UPDATE_GROUP_INFO_FAILURE,
  payload: errorMessage
});

// DELETE CHAT
export const deleteChatStart = (chatId, callback) => ({
  type: ChatsActionTypes.DELETE_CHAT_START,
  payload: chatId,
  callback
});

export const deleteChatSuccess = userChats => ({
  type: ChatsActionTypes.DELETE_CHAT_SUCCESS,
  payload: userChats
});

export const deleteChatFailure = errorMessage => ({
  type: ChatsActionTypes.DELETE_CHAT_FAILURE,
  payload: errorMessage
});

// REMOVE USER FROM CHAT
export const removeUserFromChatStart = (chatId, callback) => ({
  type: ChatsActionTypes.REMOVE_USER_FROM_CHAT_START,
  payload: chatId,
  callback
});

export const removeUserFromChatSuccess = userChats => ({
  type: ChatsActionTypes.REMOVE_USER_FROM_CHAT_SUCCESS,
  payload: userChats
});

export const removeUserFromChatFailure = errorMessage => ({
  type: ChatsActionTypes.REMOVE_USER_FROM_CHAT_FAILURE,
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
