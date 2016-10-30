import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class CommentApi {
  static addComment(comment, adopterId) {
    return api.post(route(adopterId), comment);
  }

  static getComments(row, page, adopterId) {
    return api.get(`${route(adopterId)}?page=${page}&row=${row}`);
  }
}

export default CommentApi;

const route = (adopterId) => {
  return `${consts.API_STAGING_URL}/adopters/${adopterId}/comments`;
};
