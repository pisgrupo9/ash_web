import * as types from './actionTypes';
import userApi from '../api/userApi';
import * as session from './sessionActions';
import { toastr } from 'react-redux-toastr';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
  };
};

export const showLoginUserSuccess = (user) => {
  return {
    type: types.SHOW_USER_LOGINS_SUCCESS,
    user
  };
};

export const showLoginUserError = (user) => {
  return {
    type: types.SHOW_USER_LOGINS_ERROR,
    user
  };
};

export const sendUserFormSuccess = () => {
  return {
    type: types.SEND_USER_FORM_SUCCESS
  };
};

export const sendUserFormError = (errors) => {
  return {
    type: types.SEND_USER_FORM_ERROR,
    errors
  };
};

export const sendUserForm = (user, history) => {
  return (dispatch) => {
      userApi.sendForm(user).then(() => {
      history.push(`/login`);
      toastr.success('', 'Tu solicitud de cuenta ha sido enviada');
      dispatch(sendUserFormSuccess());
    }).catch(err => {
      dispatch(sendUserFormError(err));
    });
  };
};

export const showLoginUser = () => {
  const current_session = session.loadSession();
  if (current_session && current_session.token)
    return (dispatch) => {
        userApi.showLoginUser().then(
        user => {
          dispatch(showLoginUserSuccess(user));
        },
        error => {
          if (error.errors) session.deleteSession();
          dispatch(sendUserFormError(error));
        }
      ).catch(err => {
         dispatch(sendUserFormError(err));
      });
    };
  else
    return () => {};
};
