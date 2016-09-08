import * as types from '../actions/actionTypes';
import initialState from './initialState';

const speciesReducer = (state = initialState.species, action) => {
  switch (action.type) {
    case types.LOAD_SPECIES_SUCCESS:
      return action.response.species;
    default:
      return state;
  }
};

export default speciesReducer;
