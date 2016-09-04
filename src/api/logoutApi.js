import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Logout {
  static deleteLogout() {
    return api.delete(`${consts.APIARY_URL}/users/sign_out`,{});
  }
}

export default Logout;
