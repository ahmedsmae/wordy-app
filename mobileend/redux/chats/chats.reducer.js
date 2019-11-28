import ChatsActionTypes from './chats.types';

const INITIAL_STATE = {
  userChats: [],
  currentChatId: null,
  loading: false,
  errorMessage: ''
};

const chatsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ChatsActionTypes.GET_ALL_USER_CHATS_START:
    case ChatsActionTypes.CREATE_GROUP_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_CHAT_ID_START:
      return {
        ...state,
        currentChatId: null,
        loading: true,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_ALL_USER_CHATS_SUCCESS:
    case ChatsActionTypes.CREATE_GROUP_SUCCESS:
      return {
        ...state,
        userChats: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_CHAT_ID_SUCCESS:
      return {
        ...state,
        currentChatId: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_ALL_USER_CHATS_FAILURE:
      return {
        ...state,
        userChats: [],
        loading: false,
        errorMessage: payload
      };

    case ChatsActionTypes.CREATE_GROUP_FAILURE:
      return {
        ...state,
        loading: false,
        errorMessage: payload
      };

    case ChatsActionTypes.GET_CHAT_ID_FAILURE:
      return {
        ...state,
        currentChatId: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default chatsReducer;
