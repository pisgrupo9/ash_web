import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class ServerStatusApi {
  static getServerStatus() {
    return api.get(`${consts.API_STAGING}`);
  }
}

export default ServerStatusApi;
