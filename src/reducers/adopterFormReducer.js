import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adopterFormReducer = (state = initialState.adopterForm, action) => {

  switch (action.type) {
    case types.SEND_ADOPTER_FORM_ERROR:
      return Object.assign({}, state, { errors: action.errors });
    case types.SEND_ADOPTER_FORM_SUCCESS:
      return Object.assign({}, state, { success: true });
    case types.CANCEL_ADOPTER_FORM:
      return initialState.adopterForm;
    default:
      return state;
  }
};

export default adopterFormReducer;
