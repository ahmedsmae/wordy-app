const production = false;

const DEV_BASE_URL = 'http://192.168.1.100:5000';
const PRO_BASE_URL = '';

export const BASE_URL = production ? PRO_BASE_URL : DEV_BASE_URL;

export const APP_URLS = {
  SIGN_UP_NEW_USER: userData => ({
    method: 'POST',
    url: `${BASE_URL}/api/users/signup`,
    data: userData
  }),
  SIGN_IN_USER: userData => ({
    method: 'POST',
    url: `${BASE_URL}/api/users/signin`,
    data: userData
  }),
  SIGN_IN_WITH_FACEBOOK: {
    method: 'POST',
    url: `${BASE_URL}/api/users/signinwithfacebook`
  },
  SIGN_IN_WITH_GOOGLE: {
    method: 'POST',
    url: `${BASE_URL}/api/users/signinwithgoogle`
  },
  LOAD_USER: {
    method: 'GET',
    url: `${BASE_URL}/api/users/auth`
  },
  SIGN_OUT_USER: {
    method: 'POST',
    url: `${BASE_URL}/api/users/signout`
  },
  DELETE_USER: deleteData => ({
    method: 'DELETE',
    url: `${BASE_URL}/api/users/deleteuser`,
    data: deleteData
  }),
  SERVER_USER_AVATAR: {
    method: 'GET',
    url: `${BASE_URL}/api/users/avatar`
  },
  EDIT_USER_INFO: userInfo => ({
    method: 'PATCH',
    url: `${BASE_URL}/api/users/updateinfo`,
    data: userInfo
  }),
  EDIT_USER_AVATAR: {
    method: 'POST',
    url: `${BASE_URL}/api/users/updateavatar`
  },
  GET_USER_CHATS: {
    method: 'GET',
    url: `${BASE_URL}/api/chats/alluserchats`
  },
  GET_ALL_USERS: {
    method: 'GET',
    url: `${BASE_URL}/api/users/allusers`
  },
  GET_CHAT_BY_ID: chatId => ({
    method: 'GET',
    url: `${BASE_URL}/api/chats/getchatbyid/${chatId}`
  }),
  GET_CHAT_BY_OPPONENT_ID: opponentId => ({
    method: 'GET',
    url: `${BASE_URL}/api/chats/getchatbyopponentid/${opponentId}`
  })
};
