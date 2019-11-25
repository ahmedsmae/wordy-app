import { createSelector } from 'reselect';

const selectUser = state => state.currentUser;

export const selectCurrentUser = createSelector(
  [selectUser],
  user => user.currentUser
);

export const selectLoading = createSelector([selectUser], user => user.loading);

export const selectErrorMessage = createSelector(
  [selectUser],
  user => user.errorMessage
);
