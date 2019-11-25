import { all, call } from 'redux-saga/effects';

// import all sagas
import currentUserSagas from './current-user/current-user.sagas';
import chatsSagas from './chats/chats.sagas';
import usersSagas from './users/users.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(currentUserSagas),
    call(chatsSagas),
    call(usersSagas)
  ]);
}
