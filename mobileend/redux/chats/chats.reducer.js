import ChatsActionTypes from './chats.types';

const INITIAL_STATE = {
  userChats: [],
  currentChatId: null,
  selectedChat: null,
  loading: false,
  errorMessage: ''
};

const chatsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ChatsActionTypes.GET_ALL_USER_CHATS_START:
    case ChatsActionTypes.CREATE_GROUP_START:
    case ChatsActionTypes.UPDATE_GROUP_INFO_START:
    case ChatsActionTypes.DELETE_CHAT_START:
    case ChatsActionTypes.REMOVE_USER_FROM_CHAT_START:
    case ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_START:
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

    case ChatsActionTypes.GET_CHAT_BY_ID_START:
      return {
        ...state,
        selectedChat: null,
        loading: true,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_ALL_USER_CHATS_SUCCESS:
    case ChatsActionTypes.CREATE_GROUP_SUCCESS:
    case ChatsActionTypes.UPDATE_GROUP_INFO_SUCCESS:
    case ChatsActionTypes.DELETE_CHAT_SUCCESS:
    case ChatsActionTypes.REMOVE_USER_FROM_CHAT_SUCCESS:
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

    case ChatsActionTypes.GET_CHAT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedChat: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_SUCCESS:
      return {
        ...state,
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
    case ChatsActionTypes.UPDATE_GROUP_INFO_FAILURE:
    case ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_FAILURE:
    case ChatsActionTypes.DELETE_CHAT_FAILURE:
    case ChatsActionTypes.REMOVE_USER_FROM_CHAT_FAILURE:
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

    case ChatsActionTypes.GET_CHAT_BY_ID_FAILURE:
      return {
        ...state,
        selectedChat: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default chatsReducer;
