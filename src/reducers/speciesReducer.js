import * as types from '../actions/actionTypes';
import initialState from './initialState';

const speciesReducer = (state = initialState.species, action) => {
  switch (action.type) {
    case types.LOAD_SPECIES_SUCCESS: {
      let sortSpecies = action.response.species.sort(
        (a, b) => {
          return (a.name =='Otros' || a.name =='Otro')
              ? 1 :(b.name=='Otros' || b.name =='Otro')
              ? -1 : (a.name > b.name);
        }
      );
      return sortSpecies;
    }
    case types.LOAD_SPECIES_ERROR: {
      if (action.errors.errors[0] === "Debe proveer un token válido") {
        let speciesError = { error: "NOT_LOGGED" };
        return speciesError;
      }

      return state;
    }
    default:
      return state;
  }
};

export default speciesReducer;
