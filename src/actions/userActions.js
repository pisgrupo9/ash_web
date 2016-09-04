import * as types from './actionTypes';
import userApi from '../api/userApi';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
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

export const loadUsers = () => {
  return (dispatch) => {
    return userApi.getAllUsers().then(users => {
      dispatch(loadUsersSuccess(users));
    }).catch(err => {
      throw(err);
    });
  };
};

export const sendUserForm = (user, history) => {
  return (dispatch) => {
    return userApi.sendForm(user).then(() => {
      history.push(`/login`);
      dispatch(sendUserFormSuccess());
    }).catch(err => {
      dispatch(sendUserFormError(err));
    });
  };
};
