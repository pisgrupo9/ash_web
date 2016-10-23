import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class ReportApi {
  static getReportsUser(userId) {
    return api.get(`${consts.API_STAGING_URL}/users/${userId}/reports`);
  }
}

export default ReportApi;
