import * as types from './actionTypes';
import logoutApi from '../api/loginApi';
import * as session from './sessionActions';

export function logout() {
  return { type: types.LOGOUT_USER };
}

export const logoutDispatch = (history) => {
  return (dispatch) => {
    logoutApi.deleteLogout().then(() => {
      session.deleteSession();
      history.push('/login');
      dispatch(logout());
    }).catch(() => {
      session.deleteSession();
      history.push('/login');
      dispatch(logout());
    });
  };
};
