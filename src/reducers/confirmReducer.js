import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function confirmReducer(state = initialState.confirm, action) {

  switch (action.type) {
      case types.CONFIRM_OPEN: {
        return action.confirm;
      }
      default: {
        return state;
      }
    }
}
