import { takeLatest, call, put, all } from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-google-app-auth';

import { APP_URLS } from '../utils/urls';
import setAuthToken from '../utils/set-auth-token';
import { createImageFD } from '../utils/create-form-data';

import CurrentUserActionTypes from './current-user.types';
import {
  signUpUserSuccess,
  signUpUserFailure,
  signInUserSuccess,
  signInUserFailure,
  signInWithFacebookSuccess,
  signInWithFacebookFailure,
  signInWithGoogleSuccess,
  signInWithGoogleFailure,
  updateUserAvatarSuccess,
  updateUserAvatarFailure,
  updateUserInfoSuccess,
  updateUserInfoFailure,
  loadingUserSuccess,
  loadingUserFailure,
  signoutUserSuccess,
  signoutUserFailure,
  changeUserPasswordSuccess,
  changeUserPasswordFailure,
  forgetUserPasswordSuccess,
  forgetUserPasswordFailure,
  contactUsSuccess,
  contactUsFailure,
  deleteUserSuccess,
  deleteUserFailure
} from './current-user.actions';

function* signUpUserAsync({ payload, callback }) {
  try {
    const response = yield call(axios, APP_URLS.SIGN_UP_NEW_USER(payload));

    yield AsyncStorage.setItem('BASIC_TOKEN', response.data.token);

    yield call(callback);
    yield put(signUpUserSuccess(response.data));
  } catch (err) {
    console.log(err);

    console.log('signUpUserAsync', err.response);
    yield call(callback, err);
    yield put(signUpUserFailure(err.message));
  }
}

function* signInUserAsync({ payload, callback }) {
  try {
    const response = yield call(axios, APP_URLS.SIGN_IN_USER(payload));

    yield AsyncStorage.setItem('BASIC_TOKEN', response.data.token);

    yield call(callback);
    yield put(signInUserSuccess(response.data));
  } catch (err) {
    yield call(callback, err);
    console.log('signInUserAsync', err.response);
    yield put(signInUserFailure(err.message));
  }
}

function* signInWithFacebookAsync({ callback }) {
  try {
    const { type, token } = yield Facebook.logInWithReadPermissionsAsync(
      '940466823019638',
      {
        permissions: ['public_profile', 'email']
      }
    );

    if (type === 'success') {
      yield AsyncStorage.setItem('FACEBOOK_TOKEN', token);
      yield setAuthToken();
      const response = yield call(axios, APP_URLS.SIGN_IN_WITH_FACEBOOK);
      yield call(callback);
      yield put(signInWithFacebookSuccess(response.data));
    } else {
      throw new Error('You need a permission to login');
    }
  } catch (err) {
    yield call(callback, err);
    console.log('signInWithFacebookAsync', err.response);
    yield put(signInWithFacebookFailure(err.message));
  }
}

function* signInWithGoogleAsync({ callback }) {
  try {
    const { type, accessToken } = yield Google.logInAsync({
      androidClientId:
        '922862379273-cqcss1nqg5dp6ins7aqmf4r08botssk7.apps.googleusercontent.com',
      iosClientId:
        '922862379273-1b4og6fn8jp8rr7tnnble503uel8jtvr.apps.googleusercontent.com',
      scopes: ['profile', 'email']
    });

    if (type === 'success') {
      yield AsyncStorage.setItem('GOOGLE_TOKEN', accessToken);
      yield setAuthToken();
      const response = yield call(axios, APP_URLS.SIGN_IN_WITH_GOOGLE);
      yield call(callback);
      yield put(signInWithGoogleSuccess(response.data));
    } else {
      throw new Error('You need a permission to login');
    }
  } catch (err) {
    yield call(callback, err);
    console.log('signInWithGoogleAsync', err.response);
    yield put(signInWithGoogleFailure(err.message));
  }
}

function* updateUserAvatarAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const formData = createImageFD('avatar', payload);

    const response = yield call(
      axios.post,
      APP_URLS.UPDATE_USER_AVATAR.url,
      formData
    );

    yield call(callback);
    yield put(updateUserAvatarSuccess(response.data));
  } catch (err) {
    yield call(callback, err);
    console.log('updateUserAvatarAsync', err.response);
    yield put(updateUserAvatarFailure(err.message));
  }
}

function* updateUserInfoAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.UPDATE_USER_INFO(payload));

    yield call(callback);
    yield put(updateUserInfoSuccess(response.data));
  } catch (err) {
    yield call(callback, err);
    console.log('updateUserInfoAsync', err.response);
    yield put(updateUserInfoFailure(err.message));
  }
}

function* loadingUserAsync({ callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.LOAD_USER);

    yield call(callback);
    yield put(loadingUserSuccess(response.data));
  } catch (err) {
    yield call(callback, err);
    console.log('loadingUserAsync', err.response);
    yield put(loadingUserFailure(err.message));
  }
}

function* signOutUserAsync({ callback }) {
  try {
    yield setAuthToken();

    yield call(axios, APP_URLS.SIGN_OUT_USER);

    yield AsyncStorage.removeItem('BASIC_TOKEN');

    yield call(callback);
    yield put(signoutUserSuccess());
  } catch (err) {
    yield call(callback, err);
    console.log('signOutUserAsync', err.response);
    yield put(signoutUserFailure(err.message));
  }
}

function* changeUserPasswordAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    const response = yield call(axios, APP_URLS.CHANGE_USER_PASSWORD(payload));

    yield AsyncStorage.setItem('BASIC_TOKEN', response.data.token);

    yield call(callback);
    yield put(changeUserPasswordSuccess(response.data));
  } catch (err) {
    yield call(callback, err);
    console.log('changeUserPasswordAsync', err.response);
    yield put(changeUserPasswordFailure(err.message));
  }
}

function* forgetUserPasswordAsync({ payload, callback }) {
  try {
    yield call(axios, APP_URLS.FORGET_USER_PASSWORD(payload));

    yield call(callback);
    yield put(forgetUserPasswordSuccess());
  } catch (err) {
    yield call(callback, err);
    console.log('forgetUserPasswordAsync', err.response);
    yield put(forgetUserPasswordFailure(err.message));
  }
}

function* contactUsAsync({ payload, callback }) {
  try {
    yield call(axios, APP_URLS.CONTACT_US(payload));

    yield call(callback);
    yield put(contactUsSuccess());
  } catch (err) {
    yield call(callback, err);
    console.log('contactUsAsync', err.response);
    yield put(contactUsFailure(err.message));
  }
}

function* deleteUserAsync({ payload, callback }) {
  try {
    yield setAuthToken();

    yield call(axios, APP_URLS.DELETE_USER(payload));

    yield AsyncStorage.removeItem('BASIC_TOKEN');

    yield call(callback);
    yield put(deleteUserSuccess());
  } catch (err) {
    yield call(callback, err);
    yield put(deleteUserFailure(err.message));
    console.log('deleteUserAsync', err.response);
  }
}

function* signUpUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_UP_USER_START, signUpUserAsync);
}

function* signInUserStart() {
  yield takeLatest(CurrentUserActionTypes.SIGN_IN_USER_START, signInUserAsync);
}

function* signInWithFacebookStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_IN_WITH_FACEBOOK_START,
    signInWithFacebookAsync
  );
}

function* signInWithGoogleStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_IN_WITH_GOOGLE_START,
    signInWithGoogleAsync
  );
}

function* updateUserAvatarStart() {
  yield takeLatest(
    CurrentUserActionTypes.UPDATE_USER_AVATAR_START,
    updateUserAvatarAsync
  );
}

function* updateUserInfoStart() {
  yield takeLatest(
    CurrentUserActionTypes.UPDATE_USER_INFO_START,
    updateUserInfoAsync
  );
}

function* loadingUserStart() {
  yield takeLatest(CurrentUserActionTypes.LOADING_USER_START, loadingUserAsync);
}

function* signOutUserStart() {
  yield takeLatest(
    CurrentUserActionTypes.SIGN_OUT_USER_START,
    signOutUserAsync
  );
}

function* changeUserPasswordStart() {
  yield takeLatest(
    CurrentUserActionTypes.CHANGE_USER_PASSWORD_START,
    changeUserPasswordAsync
  );
}

function* forgetUserPasswordStart() {
  yield takeLatest(
    CurrentUserActionTypes.FORGET_USER_PASSWORD_START,
    forgetUserPasswordAsync
  );
}

function* contactUsStart() {
  yield takeLatest(CurrentUserActionTypes.CONTACT_US_START, contactUsAsync);
}

function* deleteUserStart() {
  yield takeLatest(CurrentUserActionTypes.DELETE_USER_START, deleteUserAsync);
}

export default function* currentUserSagas() {
  yield all([
    call(signUpUserStart),
    call(signInUserStart),
    call(signInWithFacebookStart),
    call(signInWithGoogleStart),
    call(updateUserAvatarStart),
    call(updateUserInfoStart),
    call(loadingUserStart),
    call(signOutUserStart),
    call(changeUserPasswordStart),
    call(forgetUserPasswordStart),
    call(contactUsStart),
    call(deleteUserStart)
  ]);
}
