import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adopterReducer = (state = initialState.adopter, action) => {
  switch (action.type) {
    case types.SHOW_ADOPTER_PROFILE:
      return action.adopter;
    default:
      return state;
  }
};

export default adopterReducer;
