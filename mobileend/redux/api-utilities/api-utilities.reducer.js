import ApiUtilitiesActionTypes from './api-utilities.types';

const INITIAL_STATE = {
  randomDate: new Date()
};

const apiUtilitiesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ApiUtilitiesActionTypes.UPDATE_RANDOM_DATE:
      return {
        ...state,
        randomDate: new Date()
      };

    default:
      return state;
  }
};

export default apiUtilitiesReducer;
