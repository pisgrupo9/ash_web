import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class UserApi {
  static getAllUsers() {
    return api.get(`${consts.APIARY_URL}/users`);
  }
}

export default UserApi;
