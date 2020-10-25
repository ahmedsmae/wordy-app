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

// UPDATE USER AVATAR
export const updateUserAvatarStart = (avatar, callback) => ({
  type: CurrentUserActionTypes.UPDATE_USER_AVATAR_START,
  payload: avatar,
  callback
});

export const updateUserAvatarSuccess = user => ({
  type: CurrentUserActionTypes.UPDATE_USER_AVATAR_SUCCESS,
  payload: user
});

export const updateUserAvatarFailure = errorMessage => ({
  type: CurrentUserActionTypes.UPDATE_USER_AVATAR_FAILURE,
  payload: errorMessage
});

// UPDATE USER INFO
export const updateUserInfoStart = (userInfo, callback) => ({
  type: CurrentUserActionTypes.UPDATE_USER_INFO_START,
  payload: userInfo,
  callback
});

export const updateUserInfoSuccess = user => ({
  type: CurrentUserActionTypes.UPDATE_USER_INFO_SUCCESS,
  payload: user
});

export const updateUserInfoFailure = errorMessage => ({
  type: CurrentUserActionTypes.UPDATE_USER_INFO_FAILURE,
  payload: errorMessage
});

// UPDATE USER NOTIFICATION TOKEN
export const updateUserNotificationTokenStart = (
  notificationToken,
  callback
) => ({
  type: CurrentUserActionTypes.UPDATE_USER_NOTIFICATION_TOKEN_START,
  payload: notificationToken,
  callback
});

export const updateUserNotificationTokenSuccess = user => ({
  type: CurrentUserActionTypes.UPDATE_USER_NOTIFICATION_TOKEN_SUCCESS,
  payload: user
});

export const updateUserNotificationTokenFailure = errorMessage => ({
  type: CurrentUserActionTypes.UPDATE_USER_NOTIFICATION_TOKEN_FAILURE,
  payload: errorMessage
});

// LOADING USER
export const loadingUserStart = callback => ({
  type: CurrentUserActionTypes.LOADING_USER_START,
  callback
});

export const loadingUserSuccess = user => ({
  type: CurrentUserActionTypes.LOADING_USER_SUCCESS,
  payload: user
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

// CHANGE USER PASSWORD
export const changeUserPasswordStart = (passwords, callback) => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_START,
  payload: passwords,
  callback
});

export const changeUserPasswordSuccess = (user, token) => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_SUCCESS,
  payload: { user, token }
});

export const changeUserPasswordFailure = errorMessage => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_FAILURE,
  payload: errorMessage
});

// FORGET USER PASSWORD
export const forgetUserPasswordStart = (email, callback) => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_START,
  payload: email,
  callback
});

export const forgetUserPasswordSuccess = () => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_SUCCESS
});

export const forgetUserPasswordFailure = errorMessage => ({
  type: CurrentUserActionTypes.CHANGE_USER_PASSWORD_FAILURE,
  payload: errorMessage
});

// CONTACT US
export const contactUsStart = (contactInfo, callback) => ({
  type: CurrentUserActionTypes.CONTACT_US_START,
  payload: contactInfo,
  callback
});

export const contactUsSuccess = () => ({
  type: CurrentUserActionTypes.CONTACT_US_SUCCESS
});

export const contactUsFailure = errorMessage => ({
  type: CurrentUserActionTypes.CONTACT_US_FAILURE,
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
