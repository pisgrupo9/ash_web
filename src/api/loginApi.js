import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Login {
  static postLogin(userLogin) {
    return api.post(`${consts.API_STAGING_URL}/users/sign_in`, userLogin);
  }
  static deleteLogout() {
    return api.delete(`${consts.API_STAGING_URL}/users/sign_out`);
  }
}

export default Login;
