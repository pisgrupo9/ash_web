import * as types from './actionTypes';
import userApi from '../api/userApi';

export const loadUsersSuccess = (users) => {
  return {
    type: types.LOAD_USERS_SUCCESS,
    users
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
