import { createSelector } from 'reselect';

const selectUsers = state => state.users;

export const selectAllUsers = createSelector(
  [selectUsers],
  users => users.allUsers
);

export const selectLoading = createSelector(
  [selectUsers],
  users => users.loading
);
