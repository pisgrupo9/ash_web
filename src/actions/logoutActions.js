import * as types from './actionTypes';
import logoutApi from '../api/logoutApi';
import * as session from './stateActions';

export function logout(){
  return { type: types.LOGOUT_USER};
}

export const logoutDispatch = (history) => {
  return (dispatch) => {
    logoutApi.deleteLogout().then(() => {
      session.deletState();
      history.push('/login');
      dispatch(logout());
    });
  };
};
