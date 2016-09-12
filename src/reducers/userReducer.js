import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case types.SHOW_USER_LOGINS_SUCCESS:
      return action.user;
    case types.SHOW_USER_LOGINS_ERROR:
      return {};
    case types.LOGIN_USER_SUCCESS:
      return {};
    default:
      return state;
  }
};

export default userReducer;
