import UsersActionTypes from './users.types';

// GET ALL USERS
export const getAllUsersStart = callback => ({
  type: UsersActionTypes.GET_ALL_USERS_START,
  callback
});

export const getAllUsersSuccess = users => ({
  type: UsersActionTypes.GET_ALL_USERS_SUCCESS,
  payload: users
});

export const getAllUsersFailure = errorMessage => ({
  type: UsersActionTypes.GET_ALL_USERS_FAILURE,
  payload: errorMessage
});
