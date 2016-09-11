import * as types from './actionTypes';
import userApi from '../api/userApi';
import * as session from './stateActions';
import {toastr} from 'react-redux-toastr';

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
      toastr.success('','Tu solicitud de cuenta ha sido enviada');
      dispatch(sendUserFormSuccess());
    }).catch(err => {
      dispatch(sendUserFormError(err));
    });
  };
};

export const showLoginUser = () => {
  return (dispatch) => {
      userApi.showLoginUser().then(user => {
      dispatch(showLoginUserSuccess(user));
    }).catch(err => {
       session.deleteState();
       dispatch(sendUserFormError(err));
    });
  };
};
