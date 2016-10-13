import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adoptersReducer = (state = initialState.adopters, action) => {
  switch (action.type) {
    case types.LOAD_ADOPTERS_SUCCESS: {
      const { adopters, total_pages } = action.response;
      return { total_pages: total_pages, adopters: adopters, first_page: true };
    }
    case types.LOAD_MORE_ADOPTERS_SUCCESS: {
      let newAdopters = state.adopters ? state.adopters : [];
      const { adopters } = action.response;
      newAdopters = newAdopters.concat(adopters);
      return Object.assign({}, state, { adopters: newAdopters, first_page: false });
    }
    default:
      return state;
  }
};

export default adoptersReducer;
