import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userFormReducer = (state = initialState.userForm, action) => {
  switch (action.type) {
    case types.SEND_USER_FORM_ERROR:
      return action.errors;
    default:
      return state;
  }
};

export default userFormReducer;
