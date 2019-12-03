import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { APP_URLS } from '../utils/urls';
import setAuthToken from '../utils/set-auth-token';
import { createImageAndDataFD, createImageFD } from '../utils/create-form-data';

import ChatsActionTypes from './chats.types';
import {
  getAllUserChatsSuccess,
  getAllUserChatsFailure,
  getChatIdSuccess,
  getChatIdFailure,
  getChatByIdSuccess,
  getChatByIdFailure,
  createGroupSuccess,
  createGroupFailure,
  updateGroupInfoSuccess,
  updateGroupInfoFailure,
  deleteChatSuccess,
  deleteChatFailure,
  removeUserFromChatSuccess,
  removeUserFromChatFailure,
  uploadMessageImageSuccess,
  uploadMessageImageFailure
} from './chats.actions';

function* getAllUserChatsAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.GET_USER_CHATS);

    yield call(callback);
    yield put(getAllUserChatsSuccess(response.data.userChats));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllUserChatsFailure(err.message));
    console.log('getAllUserChatsAsync', err.response);
  }
}

function* getChatIdAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.GET_CHAT_ID(payload));

    yield call(callback);
    yield put(getChatIdSuccess(response.data.chatId));
  } catch (err) {
    yield call(callback, err);
    yield put(getChatIdFailure(err.message));
    console.log('getChatIdAsync', err.response);
  }
}

function* getChatByIdAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.GET_CHAT_BY_ID(payload));

    yield call(callback);
    yield put(getChatByIdSuccess(response.data.chat));
  } catch (err) {
    yield call(callback, err);
    yield put(getChatByIdFailure(err.message));
    console.log('getChatByIdAsync', err.response);
  }
}

function* createGroupAsync({ payload: { avatar, ...otherProps }, callback }) {
  try {
    yield setAuthToken();

    const formData = createImageAndDataFD('avatar', avatar, otherProps);

    const response = yield call(
      axios.post,
      APP_URLS.CREATE_GROUP.url,
      formData
    );

    yield call(callback);
    yield put(createGroupSuccess(response.data.userChats));
  } catch (err) {
    console.log(err);

    yield call(callback, err);
    yield put(createGroupFailure(err.message));
    console.log('createGroupAsync', err.response);
  }
}

function* updateGroupInfoAsync({
  payload: { avatar, ...otherProps },
  callback
}) {
  try {
    yield setAuthToken();

    const formData = createImageAndDataFD('avatar', avatar, otherProps);

    const response = yield call(
      axios.patch,
      APP_URLS.UPDATE_GROUP_INFO.url,
      formData
    );

    yield call(callback);
    yield put(updateGroupInfoSuccess(response.data.userChats));
  } catch (err) {
    console.log(err);

    yield call(callback, err);
    yield put(updateGroupInfoFailure(err.message));
    console.log('updateGroupInfoAsync', err);
  }
}

function* deleteChatAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.DELETE_CHAT(payload));

    yield call(callback);
    yield put(deleteChatSuccess(response.data.userChats));
  } catch (err) {
    yield call(callback, err);
    yield put(deleteChatFailure(err.message));
    console.log('deleteChatAsync', err.response);
  }
}

function* removeUserFromChatAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.REMOVE_USER_FROM_CHAT(payload));

    yield call(callback);
    yield put(removeUserFromChatSuccess(response.data.userChats));
  } catch (err) {
    yield call(callback, err);
    yield put(removeUserFromChatFailure(err.message));
    console.log('removeUserFromChatAsync', err.response);
  }
}

function* uploadMessageImageAsync({
  payload: { image, imageFileName },
  callback
}) {
  try {
    yield setAuthToken();
    const formData = createImageFD('image', image);
    yield call(
      axios.post,
      `${APP_URLS.UPLOAD_MESSAGE_IMAGE.url}/${imageFileName}`,
      formData
    );

    yield call(callback);
    yield put(uploadMessageImageSuccess());
  } catch (err) {
    console.log(err);

    yield call(callback, err);
    yield put(uploadMessageImageFailure(err.message));
    console.log('uploadMessageImageAsync', err.response);
  }
}

function* getAllUserChatsStart() {
  yield takeLatest(
    ChatsActionTypes.GET_ALL_USER_CHATS_START,
    getAllUserChatsAsync
  );
}

function* getChatIdStart() {
  yield takeLatest(ChatsActionTypes.GET_CHAT_ID_START, getChatIdAsync);
}

function* getChatByIdStart() {
  yield takeLatest(ChatsActionTypes.GET_CHAT_BY_ID_START, getChatByIdAsync);
}

function* createGroupStart() {
  yield takeLatest(ChatsActionTypes.CREATE_GROUP_START, createGroupAsync);
}

function* updateGroupInfoStart() {
  yield takeLatest(
    ChatsActionTypes.UPDATE_GROUP_INFO_START,
    updateGroupInfoAsync
  );
}

function* deleteChatStart() {
  yield takeLatest(ChatsActionTypes.DELETE_CHAT_START, deleteChatAsync);
}

function* removeUserFromChatStart() {
  yield takeLatest(
    ChatsActionTypes.REMOVE_USER_FROM_CHAT_START,
    removeUserFromChatAsync
  );
}

function* uploadMessageImageStart() {
  yield takeLatest(
    ChatsActionTypes.UPLOAD_MESSAGE_IMAGE_START,
    uploadMessageImageAsync
  );
}

export default function* chatsSagas() {
  yield all([
    call(getAllUserChatsStart),
    call(getChatIdStart),
    call(getChatByIdStart),
    call(createGroupStart),
    call(updateGroupInfoStart),
    call(deleteChatStart),
    call(removeUserFromChatStart),
    call(uploadMessageImageStart)
  ]);
}
