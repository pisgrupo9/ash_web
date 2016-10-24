import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adopterReducer = (state = initialState.adopter, action) => {
  switch (action.type) {
    case types.SHOW_ADOPTER_PROFILE:
      return action.adopter;
    case types.ADD_TO_BLACKLIST_SUCCESS: {
      return Object.assign({}, state, { blackListSuccess: true });
    }
    default:
      return state;
  }
};

export default adopterReducer;
