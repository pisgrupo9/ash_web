import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function exportReducer(state = initialState.download, action) {

  switch (action.type) {
      case types.DOWNLOAD: {
        return { url: action.url };
      }
      default: {
        return state;
      }
    }
}
