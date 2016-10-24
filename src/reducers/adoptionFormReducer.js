import * as types from '../actions/actionTypes';
import initialState from './initialState';

const adoptionFormReducer = (state = initialState.adoptionForm, action) => {
  switch (action.type) {
    case types.ADD_ADOPTION_SUCCESS: {
      return { success: true, adoptionsSended: state.adoptionsSended + 1 };
    }
    case types.ADD_ADOPTION_ERROR: {
      return { success: false, adoptionsSended: state.adoptionsSended + 1 };
    }
    default:
      return state;
  }
};

export default adoptionFormReducer;
