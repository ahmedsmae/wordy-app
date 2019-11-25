import UsersActionTypes from './users.types';

const INITIAL_STATE = {
  allUsers: [],
  loading: false,
  errorMessage: ''
};

const usersReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case UsersActionTypes.GET_ALL_USERS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case UsersActionTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: payload,
        loading: false,
        errorMessage: ''
      };

    case UsersActionTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        allUsers: [],
        loading: false,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default usersReducer;
