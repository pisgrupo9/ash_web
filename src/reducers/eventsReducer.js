import * as types from '../actions/actionTypes';
import initialState from './initialState';

const eventsReducer = (state = initialState.events, action) => {

  switch (action.type) {
    case types.LOAD_EVENTS_SUCCESS: {
      let newEvents = state.events ? state.events : [];
      const { events, total_pages } = action.response;
      newEvents = newEvents.concat(events);
      return Object.assign({}, state, { total_pages: total_pages, events: newEvents });
    }
    case types.SHOW_ANIMAL_PROFILE:
      return Object.assign({}, state, { events: [] });
    default:
      return state;
  }
};

export default eventsReducer;
