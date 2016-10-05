import * as types from '../actions/actionTypes';
import initialState from './initialState';

const eventReducer = (state = initialState.event, action) => {

  switch (action.type) {
    case types.SHOW_EVENT_SUCCESS: {
      const event = action.response;
      return Object.assign({}, state, { event });
    }
    default:
      return state;
  }
};

export default eventReducer;
