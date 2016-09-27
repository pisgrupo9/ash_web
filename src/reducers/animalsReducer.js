import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalsReducer = (state = initialState.animals, action) => {

  switch (action.type) {
    case types.LOAD_ANIMALS_SUCCESS: {
      let newAnimals = state.animals ? state.animals : [];
      const { animals, total_pages } = action.response;
      newAnimals = newAnimals.concat(animals);
      return Object.assign({}, state, { total_pages: total_pages, animals: newAnimals });
    }
    default:
      return state;
  }
};

export default animalsReducer;
