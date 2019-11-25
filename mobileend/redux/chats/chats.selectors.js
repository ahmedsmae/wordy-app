import { createSelector } from 'reselect';

const selectChats = state => state.chats;

export const selectUserChats = createSelector(
  [selectChats],
  chats => chats.userChats
);

export const selectCurrentChat = createSelector(
  [selectChats],
  chats => chats.currentChat
);
