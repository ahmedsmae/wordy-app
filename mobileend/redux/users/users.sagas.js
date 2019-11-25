import { takeLatest, call, put, all } from 'redux-saga/effects';
import axios from 'axios';

import { APP_URLS } from '../utils/urls';
import setAuthToken from '../utils/set-auth-token';

import UsersActionTypes from './users.types';
import { getAllUsersSuccess, getAllUsersFailure } from './users.actions';

function* getAllUsersAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.GET_ALL_USERS);

    yield call(callback);
    yield put(getAllUsersSuccess(response.data.users));
  } catch (err) {
    yield call(callback, err);
    yield put(getAllUsersFailure(err.message));
    console.log('getAllUsersAsync', err.response);
  }
}

function* getAllUsersStart() {
  yield takeLatest(UsersActionTypes.GET_ALL_USERS_START, getAllUsersAsync);
}

export default function* usersSagas() {
  yield all([call(getAllUsersStart)]);
}
