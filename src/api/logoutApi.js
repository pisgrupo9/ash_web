import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Logout {
  static deleteLogout() {
    return api.delete(`${consts.API_STAGING_URL}/api/v1/users/sign_out`,{});
  }
}

export default Logout;
