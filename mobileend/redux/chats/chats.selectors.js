import { createSelector } from 'reselect';

const selectChats = state => state.chats;

export const selectUserChats = createSelector(
  [selectChats],
  chats => chats.userChats
);

export const selectCurrentChatId = createSelector(
  [selectChats],
  chats => chats.currentChatId
);

export const selectLoading = createSelector(
  [selectChats],
  chats => chats.loading
);
