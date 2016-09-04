import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function loginReducer(state = initialState.login, action) {

  switch (action.type) {
      case types.LOGIN_USER_SUCCES:{
        return Object.assign({},state,{token : action.response['user-token']});
      }
      case types.LOGIN_USER_ERROR:{
        return Object.assign({},state,{errorLogin: action.response.error});
      }
      default: {
        return state;
      }
    }
}
