import * as types from '../actions/actionTypes';
import initialState from './initialState';

const serverStatusReducer = (state = initialState.serverStatus, action) => {
  switch (action.type) {
    case types.LOAD_SERVER_STATUS_SUCCESS:
      return action.serverStatus;
    default:
      return state;
  }
};

export default serverStatusReducer;
