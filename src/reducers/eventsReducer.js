import * as types from '../actions/actionTypes';
import initialState from './initialState';

const eventsReducer = (state = initialState.events, action) => {
  switch (action.type) {
    case types.LOAD_EVENTS_SUCCESS: {
      let newEvents = state.events ? state.events : [];
      const { events, total_pages } = action.response;
      newEvents = newEvents.concat(events);
      return Object.assign({}, state, { totalPages: total_pages, events: newEvents, firstPage: false });
    }
    case types.SEND_EVENT_FORM_SUCCESS: {
      return Object.assign({}, state, { events: [] });
    }
    case types.CLEAN_EVENTS_SUCCESS: {
      return Object.assign({}, state, { events: [] });
    }
    case types.SEARCH_EVENTS_START: {
      return Object.assign({}, state, { searchReady: true, firstPage: true });
    }
    case types.SEARCH_EVENTS_SUCCESS: {
      const { events, total_pages } = action.response;
      return Object.assign({}, state, {
                totalPages: total_pages,
                events: events,
                filter: action.filter,
                searchReady: false
              });
    }
    case types.SEARCH_ANIMALS_ERROR: {
      return Object.assign({}, state, {
                searchReady: false,
                error: 'ERROR'
              });
    }
    default:
      return state;
  }
};

export default eventsReducer;
