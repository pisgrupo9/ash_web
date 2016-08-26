import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case types.LOAD_USERS_SUCCESS:
      return action.users;
    default:
      return state;
  }
};

export default userReducer;
