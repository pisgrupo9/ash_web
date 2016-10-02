import * as types from '../actions/actionTypes';
import initialState from './initialState';

const eventReducer = (state = initialState.event, action) => {

  switch (action.type) {
    case types.SHOW_EVENT_SUCCESS: {
      let newEvent = state.event ? state.event : [];
      const { event } = action.response;
      newEvent = newEvent.concat(event);
      return Object.assign({}, state, { event: newEvent });
    }
    default:
      return state;
  }
};

export default eventReducer;
