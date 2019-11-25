import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { APP_URLS } from '../utils/urls';
import setAuthToken from '../utils/set-auth-token';

import ChatsActionTypes from './chats.types';
import {
  getAllUserChatsSuccess,
  getAllUserChatsFailure,
  getChatByIdSuccess,
  getChatByIdFailure,
  getChatByOpponentIdSuccess,
  getChatByOpponentIdFailure
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

function* getChatByOpponentIdAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(
      axios,
      APP_URLS.GET_CHAT_BY_OPPONENT_ID(payload)
    );

    yield call(callback);
    yield put(getChatByOpponentIdSuccess(response.data.chat));
  } catch (err) {
    yield call(callback, err);
    yield put(getChatByOpponentIdFailure(err.message));
    console.log('getChatByOpponentIdAsync', err.response);
  }
}

function* getAllUserChatsStart() {
  yield takeLatest(
    ChatsActionTypes.GET_ALL_USER_CHATS_START,
    getAllUserChatsAsync
  );
}

function* getChatByIdStart() {
  yield takeLatest(ChatsActionTypes.GET_CHAT_BY_ID_START, getChatByIdAsync);
}

function* getChatByOpponentIdStart() {
  yield takeLatest(
    ChatsActionTypes.GET_CHAT_BY_OPPONENT_ID_START,
    getChatByOpponentIdAsync
  );
}

export default function* chatsSagas() {
  yield all([
    call(getAllUserChatsStart),
    call(getChatByIdStart),
    call(getChatByOpponentIdStart)
  ]);
}
