import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class UserApi {

  static sendForm(user) {
    return api.post(`${consts.API_STAGING_URL}/users`, user);
  }

  static showLoginUser() {
    return api.get(`${consts.API_STAGING_URL}/users/show`);
  }
}

export default UserApi;
