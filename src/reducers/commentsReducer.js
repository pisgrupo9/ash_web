import * as types from '../actions/actionTypes';
import initialState from './initialState';

const commentsReducer = (state = initialState.comments, action) => {

  switch (action.type) {
    case types.LOAD_COMMENTS_SUCCESS: {
      let newComments = action.page === 1 ? [] : state.comments;
      const { comments, total_pages } = action.response;
      newComments = newComments.concat(comments);
      let newValues = {
        totalPages: total_pages,
        comments: newComments,
        currPage: action.page
      };
      return Object.assign({}, state, newValues);
    }
    default:
      return state;
  }
};

export default commentsReducer;
