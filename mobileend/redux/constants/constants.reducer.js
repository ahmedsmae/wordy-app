import APP_WIZARD from './app-wizard.data';
import DELETE_USER_REASONS from './delete-user-reasons.data';

const INITIAL_STATE = {
  appWizard: APP_WIZARD,
  deleteUserReasons: DELETE_USER_REASONS
};

const constantsReducer = (state = INITIAL_STATE, { type }) => {
  switch (type) {
    default:
      return state;
  }
};

export default constantsReducer;
