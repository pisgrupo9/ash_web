import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalsReducer = (state = initialState.animals, action) => {

  switch (action.type) {
    case types.LOAD_ANIMALS_SUCCESS: {
      const { animals, total_pages } = action.response;
      return { total_pages: total_pages, animals: animals, first_page: true, filterParam: '' };
    }
    case types.LOAD_MORE_ANIMALS_SUCCESS: {
      let newAnimals = state.animals ? state.animals : [];
      const { animals } = action.response;
      newAnimals = newAnimals.concat(animals);
      return Object.assign({}, state, { animals: newAnimals, first_page: false });
    }
    case types.SEARCH_ANIMALS_START: {
      return Object.assign({}, state, { searchReady: true });
    }
    case types.SEARCH_ANIMALS_SUCCESS: {
      const { animals, total_pages } = action.response;
      return Object.assign({}, state, {
                total_pages: total_pages,
                animals: animals,
                first_page: true,
                filterParam: action.filterParam,
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

export default animalsReducer;
