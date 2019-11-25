import { combineReducers } from 'redux';

// import all reducers
import currentUserReducer from './current-user/current-user.reducer';
import chatsReducer from './chats/chats.reducer';
import usersReducer from './users/users.reducer';
import constantsReducer from './constants/constants.reducer';

const rootReducer = combineReducers({
  // add all reducers
  currentUser: currentUserReducer,
  constants: constantsReducer,
  chats: chatsReducer,
  users: usersReducer
});

export default rootReducer;
