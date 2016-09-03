import * as types from './actionTypes';
import loginApi from '../api/loginApi';

export const  loginUser = (request) =>  {
    return {
        type: types.LOGIN_USER,
        request
    };
};

export const login = (user) => {
  return (dispatch) => {
    return loginApi.postLogin(user).then(respons => {
      dispatch(loginUser(respons));
    }).catch(err => {
      throw(err);
    });
  };
};
