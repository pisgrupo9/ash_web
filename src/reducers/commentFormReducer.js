import * as types from '../actions/actionTypes';
import initialState from './initialState';

const commentFormReducer = (state = initialState.commentForm, action) => {
  switch (action.type) {
    case types.ADD_COMMENT_SUCCESS: {
      return { success: true, errors: '' };
    }
    case types.ADD_COMMENT_ERROR: {
      return { ...state, errors: action.response.error };
    }
    case types.CLEAN_COMMENT_FORM: {
      return initialState.commentForm;
    }
    default:
      return state;
  }
};

export default commentFormReducer;
