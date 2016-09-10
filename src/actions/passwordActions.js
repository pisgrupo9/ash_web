import * as types from './actionTypes';
import PasswordApi, { parseEmail } from '../api/passwordApi';
import { toastr } from 'react-redux-toastr';

export const sendPasswordRequestError = () => {
  return {
    type: types.REQUEST_PASSWORD_ERROR
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
