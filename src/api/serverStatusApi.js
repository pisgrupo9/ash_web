import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class ServerStatusApi {
  static getServerStatus() {
    return api.get(`${consts.HEROKU_URL}`);
  }
}

export default ServerStatusApi;
