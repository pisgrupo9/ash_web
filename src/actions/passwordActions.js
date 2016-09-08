import * as types from './actionTypes';
import {toastr} from 'react-redux-toastr';
import PasswordApi, { parseEmail } from '../api/passwordApi';

export const sendPasswordRequestError = () => {
  return {
    type: types.REQUEST_PASSWORD_ERROR
  };
};

export const  updatePassError = (response) =>  {
  return {
    type: types.SEND_USER_UPDATE_PASS_ERROR,
    response
  };
};

export const sendPasswordRequest = (email, history) => {
  return (dispatch) => {
    let user = parseEmail(email);
    return PasswordApi.requestPasswordReset(user).then(() => {
      history.push(`/login`);
      toastr.success('', 'Su solicitud ha sido procesada, se le enviara un mail en breve con instrucciones para que modifique su contraseña');
    }).catch(() => {
      dispatch(sendPasswordRequestError());
    });
  };
};

export const updatePass = (pass, history) => {
  return (dispatch) => {
    return PasswordApi.upadatePass(pass).then(() => {
      history.push(`/login`);
      toastr.success('','Su password se actualizo correctamente');
    }).catch(err => {
      dispatch(updatePassError(err));
    });
  };
};
