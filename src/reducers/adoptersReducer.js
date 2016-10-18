import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adoptersReducer = (state = initialState.adopters, action) => {
  switch (action.type) {
    case types.LOAD_ADOPTERS_SUCCESS: {
      let newAdopters = action.row === 1 ? [] : state.adopters;
      const { adopters, total_pages } = action.response;
      newAdopters = newAdopters.concat(adopters);
      let newValues = {
        totalPages: total_pages,
        adopters: newAdopters,
        firstPage: false,
        filterParam: action.filterParam || {}
      };
      return Object.assign({}, state, newValues);
    }
    case types.SEND_ADOPTER_FORM_SUCCESS: {
      return initialState.adopters;
    }
    case types.CLEAN_ADOPTERS_SUCCESS: {
      return Object.assign({}, state, { totalPages: 0, adopters: [], firstPage: false });
    }
    default:
      return state;
  }
};

export default adoptersReducer;
