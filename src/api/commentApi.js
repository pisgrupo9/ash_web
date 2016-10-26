import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class CommentApi {
  static addComment(comment, adopterId) {
    return api.post(`${consts.API_STAGING_URL}/adopters/${adopterId}/comments`, comment);
  }
}

export default CommentApi;
