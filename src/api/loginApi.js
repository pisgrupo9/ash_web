import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class Login {
  static postLogin(userLogin) {
    return api.post(`${consts.API_URL}/users/sign_in`,userLogin);
  }
}

export default Login;