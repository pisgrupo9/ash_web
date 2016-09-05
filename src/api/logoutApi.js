import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Logout {
  static deleteLogout() {
    return api.delete(`${consts.HEROKU_URL}/api/v1/users/sign_out`,{});
  }
}

export default Logout;
