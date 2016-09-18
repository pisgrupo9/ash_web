import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalsReducer = (state = initialState.animals, action) => {

  switch (action.type) {
    case types.LOAD_ANIMALS_SUCCESS:
      return action.response.animals;
    default:
      return state;
  }
};

export default animalsReducer;
