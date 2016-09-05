import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class UserApi {
  static getAllUsers() {
    return api.get(`${consts.HEROKU_URL}/users`);
  }

  static sendForm(user) {
    return api.post(`${consts.HEROKU_URL}/users`, user);
  }
}

export default UserApi;
