import CurrentUserActionTypes from './current-user.types';

// SIGN UP USER
export const signUpUserStart = (name, email, password, callback) => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_START,
  payload: { name, email, password },
  callback
});

export const signUpUserSuccess = result => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_SUCCESS,
  payload: result
});

export const signUpUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_UP_USER_FAILURE,
  payload: errorMessage
});

// SIGN IN USER
export const signInUserStart = (email, password, callback) => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_START,
  payload: { email, password },
  callback
});

export const signInUserSuccess = result => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_SUCCESS,
  payload: result
});

export const signInUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_IN_USER_FAILURE,
  payload: errorMessage
});

// SIGN IN WITH FACEBOOK
export const signInWithFacebookStart = callback => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_FACEBOOK_START,
  callback
});

export const signInWithFacebookSuccess = fbToken => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_FACEBOOK_SUCCESS,
  payload: fbToken
});

export const signInWithFacebookFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_FACEBOOK_FAILURE,
  payload: errorMessage
});

// SIGN IN WITH GOOGLE
export const signInWithGoogleStart = callback => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_GOOGLE_START,
  callback
});

export const signInWithGoogleSuccess = googleToken => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_GOOGLE_SUCCESS,
  payload: googleToken
});

export const signInWithGoogleFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_IN_WITH_GOOGLE_FAILURE,
  payload: errorMessage
});

// LOADING USER
export const loadingUserStart = callback => ({
  type: CurrentUserActionTypes.LOADING_USER_START,
  callback
});

export const loadingUserSuccess = results => ({
  type: CurrentUserActionTypes.LOADING_USER_SUCCESS,
  payload: results
});

export const loadingUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.LOADING_USER_FAILURE,
  payload: errorMessage
});

// SIGNOUT USER
export const signoutUserStart = callback => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_START,
  callback
});

export const signoutUserSuccess = () => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_SUCCESS
});

export const signoutUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.SIGN_OUT_USER_FAILURE,
  payload: errorMessage
});

// DELETE USER
export const deleteUserStart = (deleteData, callback) => ({
  type: CurrentUserActionTypes.DELETE_USER_START,
  payload: deleteData,
  callback
});

export const deleteUserSuccess = () => ({
  type: CurrentUserActionTypes.DELETE_USER_SUCCESS
});

export const deleteUserFailure = errorMessage => ({
  type: CurrentUserActionTypes.DELETE_USER_FAILURE,
  payload: errorMessage
});

// EDIT USER INFO
