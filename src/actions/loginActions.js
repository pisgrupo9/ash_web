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
        session.saveState(response);
        history.push(`/`);
        dispatch(loginUser(response));
      },
      error => {
        dispatch(loginError(error));
      }
    ).catch(err => {
      throw(err);
    });
  };
};