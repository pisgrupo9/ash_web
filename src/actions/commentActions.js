import * as types from './actionTypes';
import commentApi from '../api/commentApi';

export const addCommentSuccess = () => {
  return {
    type: types.ADD_COMMENT_SUCCESS
  };
};

export const addCommentError = (response) => {
  return {
    type: types.ADD_COMMENT_ERROR,
    response
  };
};

export const cleanCommentForm = () => {
  return {
    type: types.CLEAN_COMMENT_FORM
  };
};

export const loadCommentsSuccess = (response, page) => {
  return {
    type: types.LOAD_COMMENTS_SUCCESS,
    response,
    page
  };
};

export const addComment = (comment, adopterId) => {
  return (dispatch) => {
    return commentApi.addComment(comment, adopterId).then((response) => {
      dispatch(addCommentSuccess(response));
    }).catch(err => {
      dispatch(addCommentError(err));
    });
  };
};

export const loadComments = (row, page, adopterId) => {
  return (dispatch) => {
    return commentApi.getComments(row, page, adopterId).then(comments => {
      dispatch(loadCommentsSuccess(comments, page));
    }).catch(err => {
      throw (err);
    });
  };
};
