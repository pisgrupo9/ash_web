import * as types from '../actions/actionTypes';
import * as seccion from '../actions/stateActions';
import initialState from './initialState';

export default function loginReducer(state = initialState.login,action) {

  switch (action.type) {
      case types.LOGIN_USER:{
        console.log(seccion.loadState());
        if(!(action.request.error)){
          //window.location = '/'; MAl ACA
          return Object.assign({},state,{token : action.request['user-token']});
        }
        return Object.assign({},state,{errorLogin: action.request.error});
      }
      default: {
        return state;
      }
    }
}
