import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import * as session from './stateActions';

export const  loginUser = (response) =>  {
  return {
      type: types.LOGIN_USER_SUCCES,
      response
  };
};

export const  loginError = (response) =>  {
  return {
    type: types.LOGIN_USER_ERROR,
    response
  };
};

export const login = (user, history) => {
  return (dispatch) => {
    loginApi.postLogin(user).then(response => {
      if(response.user){
        session.saveState(response);
        history.push(`/`);
        dispatch(loginUser(response));
      }else{
        dispatch(loginError(response));
      }
    }).catch(err => {
      throw(err);
    });
  };
};
