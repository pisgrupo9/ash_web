import * as types from '../actions/actionTypes';
import initialState from './initialState';

const passwordReducer = (state = initialState.resetPass, action) => {
  switch (action.type) {
    case types.REQUEST_PASSWORD_ERROR: {
      return Object.assign({}, state, { errors: "El mail ingresado no pertenece a un usuario" });
    }
    case types.LOAD_PASSWORD_PAGE: {
      return initialState.resetPass;
    }
    default:
      return state;
  }
};

export default passwordReducer;
