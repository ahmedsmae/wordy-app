const production = true;

const DEV_BASE_URL = 'http://192.168.1.100:5000';
const PRO_BASE_URL = 'https://afifi-wordy.herokuapp.com';

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
  UPDATE_USER_AVATAR: {
    method: 'POST',
    url: `${BASE_URL}/api/users/updateavatar`
  },
  UPDATE_USER_INFO: userInfo => ({
    method: 'PATCH',
    url: `${BASE_URL}/api/users/updateinfo`,
    data: userInfo
  }),
  CHANGE_USER_PASSWORD: userPasswords => ({
    method: 'PATCH',
    url: `${BASE_URL}/api/users/changepassword`,
    data: userPasswords
  }),
  FORGET_USER_PASSWORD: email => ({
    method: 'POST',
    url: `${BASE_URL}/api/users/forgetpassword`,
    data: email
  }),
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
  CONTACT_US: contactData => ({
    method: 'POST',
    url: `${BASE_URL}/api/users/contactus`,
    data: contactData
  }),
  SERVE_USER_AVATAR: {
    method: 'GET',
    url: `${BASE_URL}/api/users/avatar`
  },
  SERVE_CHAT_AVATAR: {
    method: 'GET',
    url: `${BASE_URL}/api/chats/avatar`
  },
  SERVE_MESSAGE_IMAGE: messageId => `${BASE_URL}/uploads/${messageId}.jpg`,
  UPLOAD_MESSAGE_IMAGE: {
    method: 'POST',
    url: `${BASE_URL}/api/chats/messages` // + /:chatid/:messageid
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
  GET_CHAT_ID: opponentId => ({
    method: 'GET',
    url: `${BASE_URL}/api/chats/getchatid/${opponentId}`
  }),
  CREATE_GROUP: {
    method: 'POST',
    url: `${BASE_URL}/api/chats/creategroup`
  },
  UPDATE_GROUP_INFO: {
    method: 'PATCH',
    url: `${BASE_URL}/api/chats/updategroupinfo`
  }
};
