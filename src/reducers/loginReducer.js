import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {

  switch (action.type) {
      case types.LOGIN_USER_SUCCESS: {
        return { token: action.response['user-token'] };
      }
      case types.LOGIN_USER_ERROR: {
        if (action.response.error)
          return { errorLogin: action.response.error };
        else if (action.response.errors)
          return { errorLogin: action.response.errors.join('<br/>') };
        return { errorLogin: 'Server Error' };
      }
      case types.LOGOUT_USER: {
        return {};
      }
      default: {
        return state;
      }
    }
}
