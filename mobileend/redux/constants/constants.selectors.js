import { createSelector } from 'reselect';

const selectConstants = state => state.constants;

export const selectAppWizardData = createSelector(
  [selectConstants],
  constants => constants.appWizard
);

export const selectDeleteUserReasons = createSelector(
  [selectConstants],
  constants => constants.deleteUserReasons
);
