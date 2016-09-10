import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class PasswordApi {
  static requestPasswordReset(user) {
    return api.post(`${consts.API_STAGING_URL}/users/password`, user);
  }
}

export default PasswordApi;

export const parseEmail = (email) => {
  let user = { user: { email : email } };
  return user;
};
