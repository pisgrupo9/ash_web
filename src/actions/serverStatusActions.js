import * as types from './actionTypes';
import serverStatusApi from '../api/serverStatusApi';

export const loadServerStatusSuccess = (serverStatus) => {
  return {
    type: types.LOAD_SERVER_STATUS_SUCCESS,
    serverStatus
  };
};

export const loadServerStatus = () => {
  return (dispatch) => {
    return serverStatusApi.getServerStatus().then(serverStatus => {
      dispatch(loadServerStatusSuccess(serverStatus));
    }).catch(err => {
      throw (err);
    });
  };
};
