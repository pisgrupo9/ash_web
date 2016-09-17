import * as types from '../actions/actionTypes';
import initialState from './initialState';

const speciesReducer = (state = initialState.species, action) => {
  switch (action.type) {
    case types.LOAD_SPECIES_SUCCESS: {
      let sortSpecies = action.response.species.sort(
        (a, b) => {
          return (a.name =='Otros') ? 1 :(b.name=='Otros')? -1 : (a.name > b.name);
        }
      );
      return sortSpecies;
    }
    default:
      return state;
  }
};

export default speciesReducer;
