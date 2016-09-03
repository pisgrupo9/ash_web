import * as types from './actionTypes';
import loginApi from '../api/loginApi';
import * as seccion from './stateActions';

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

export const login = (user) => {
  return (dispatch) => {
    loginApi.postLogin(user).then(respons => {
      if(respons.user){
        seccion.saveState(respons);
        window.location = '/';
        dispatch(loginUser(respons));
      }else{
        dispatch(loginError(respons));
      }
    }).catch(err => {
      throw(err);
    });
   
  };
};
