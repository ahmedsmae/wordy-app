import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { APP_URLS } from '../utils/urls';
import setAuthToken from '../utils/set-auth-token';
import { createImageAndDataFD } from '../utils/create-form-data';

import ChatsActionTypes from './chats.types';
import {
  getAllUserChatsSuccess,
  getAllUserChatsFailure,
  getChatIdSuccess,
  getChatIdFailure,
  createGroupSuccess,
  createGroupFailure
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

function* getAllUserChatsStart() {
  yield takeLatest(
    ChatsActionTypes.GET_ALL_USER_CHATS_START,
    getAllUserChatsAsync
  );
}

function* getChatIdStart() {
  yield takeLatest(ChatsActionTypes.GET_CHAT_ID_START, getChatIdAsync);
}

function* createGroupStart() {
  yield takeLatest(ChatsActionTypes.CREATE_GROUP_START, createGroupAsync);
}

export default function* chatsSagas() {
  yield all([
    call(getAllUserChatsStart),
    call(getChatIdStart),
    call(createGroupStart)
  ]);
}
