import { createSelector } from 'reselect';

const selectApiUtilities = state => state.apiUtilities;

export const selectRandomDate = createSelector(
  [selectApiUtilities],
  apiUtilities => apiUtilities.randomDate
);
