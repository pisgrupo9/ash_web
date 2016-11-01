import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalsReducer = (state = initialState.animals, action) => {

  switch (action.type) {
    case types.LOAD_ANIMALS_SUCCESS: {
      let newAnimals = action.row === 1 ? [] : state.animals;
      const { animals, total_pages } = action.response;
      newAnimals = newAnimals.concat(animals);
      let newValues = {
        totalPages: total_pages,
        animals: newAnimals,
        firstPage: action.row === 1,
        filterParam: action.filterParam || {}
      };
      return Object.assign({}, state, newValues);
    }
    case types.SEARCH_ANIMALS_START: {
      return Object.assign({}, state, { searchReady: true });
    }
    case types.SEARCH_ANIMALS_SUCCESS: {
      const { animals, total_pages } = action.response;
      return Object.assign({}, state, {
                totalPages: total_pages,
                animals,
                firstPage: true,
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
    case types.CLEAN_ANIMALS_SUCCESS: {
      return initialState.animals;
    }
    default:
      return state;
  }
};

export default animalsReducer;
