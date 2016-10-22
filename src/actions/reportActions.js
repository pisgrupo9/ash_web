import * as types from './actionTypes';
import reportApi from '../api/reportApi';

export const reportUpdate = (response) => {
  return {
    type: types.REPORTE_UPDATE,
    response
  };
};

export const getReportList = (userId) => {
  return (dispatch) => {
    return reportApi.getReportsUser(userId).then(response => {
      dispatch(reportUpdate(response));
    }).catch(err => {
      throw (err);
    });
  };
};
