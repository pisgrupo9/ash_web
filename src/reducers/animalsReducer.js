import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalsReducer = (state = initialState.animals, action) => {

  switch (action.type) {
    case types.LOAD_ANIMALS_SUCCESS: {
      const { animals, total_pages } = action.response;
      return { total_pages: total_pages, animals: animals, first_page: true };
    }
    case types.LOAD_MORE_ANIMALS_SUCCESS: {
      let newAnimals = state.animals ? state.animals : [];
      const { animals } = action.response;
      newAnimals = newAnimals.concat(animals);
      return Object.assign({}, state, { animals: newAnimals, first_page: false });
    }
    default:
      return state;
  }
};

export default animalsReducer;
