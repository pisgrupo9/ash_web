import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';
import * as session from '../actions/stateActions';

class Logout {
  static deleteLogout() {
    let current_session = session.loadState();
    return api.delete(`${consts.API_STAGING_URL}/users/sign_out`, current_session.token);
  }
}

export default Logout;
