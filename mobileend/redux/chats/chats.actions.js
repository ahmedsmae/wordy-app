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

// GET CHAT BY OPPONENT ID
export const getChatByOpponentIdStart = (opponentId, callback) => ({
  type: ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_START,
  payload: opponentId,
  callback
});

export const getChatByOpponentIdSuccess = chat => ({
  type: ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_SUCCESS,
  payload: chat
});

export const getChatByOpponentIdFailure = errorMessage => ({
  type: ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_FAILURE,
  payload: errorMessage
});
