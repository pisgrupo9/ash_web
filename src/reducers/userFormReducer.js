import * as types from '../actions/actionTypes';
import initialState from './initialState';

const userFormReducer = (state = initialState.userForm, action) => {
  switch (action.type) {
    case types.SEND_USER_FORM_ERROR:
      return action.errors;
    case types.SEND_USER_UPDATE_PASS_ERROR:
      if (action.response.errors && action.response.errors.reset_password_token)
        return Object.assign({}, state, { errorPass: action.response.errors.reset_password_token.join('<br/>') });
      return Object.assign({}, state, { errorPass: 'Server Error' });
    default:
      return state;
  }
};

export default userFormReducer;
