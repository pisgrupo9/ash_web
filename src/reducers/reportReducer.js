import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function reportReducer(state = initialState.reports, action) {
  switch (action.type) {
    case types.REPORTE_UPDATE: {
      return action.response.reports;
    }
    default: {
      return state;
    }
  }
}

