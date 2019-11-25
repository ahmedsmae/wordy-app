import ChatsActionTypes from './chats.types';

const INITIAL_STATE = {
  userChats: [],
  currentChat: null,
  loading: false,
  errorMessage: ''
};

const chatsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ChatsActionTypes.GET_ALL_USER_CHATS_START:
    case ChatsActionTypes.GET_CHAT_BY_ID_START:
    case ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_ALL_USER_CHATS_SUCCESS:
      return {
        ...state,
        userChats: payload,
        loading: false,
        errorMessage: ''
      };

    case ChatsActionTypes.GET_CHAT_BY_ID_SUCCESS:
    case ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_SUCCESS:
      return {
        ...state,
        currentChat: payload,
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

    case ChatsActionTypes.GET_CHAT_BY_ID_FAILURE:
    case ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_FAILURE:
      return {
        ...state,
        currentChat: null,
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default chatsReducer;
