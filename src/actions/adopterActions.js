import * as types from './actionTypes';
import adopterApi, { parseAdopter, parseErrors, parseFilter } from '../api/adopterApi';

export const sendAdopterFormSuccess = (response) => {
  return {
    type: types.SEND_ADOPTER_FORM_SUCCESS,
    response
  };
};

export const loadAdoptersSuccess = (response, row) => {
  return {
    type: types.LOAD_ADOPTERS_SUCCESS,
    row,
    response
  };
};

export const sendAdopterFormError = (errors) => {
  return {
    type: types.SEND_ADOPTER_FORM_ERROR,
    errors: parseErrors(errors.error)
  };
};

export const cancelAdopterForm = () => {
  return {
    type: types.CANCEL_ADOPTER_FORM
  };
};

export const loadSerchSuccess = (response, row, filterParam) => {
  return {
    type: types.LOAD_ADOPTERS_SUCCESS,
    row,
    filterParam,
    response
  };
};

export const cleanAdoptersSuccess = () => {
  return {
    type: types.CLEAN_ADOPTERS_SUCCESS
  };
};

export const sendAdopterForm = (adopter) => {
  return (dispatch) => {
    let adopterJson = parseAdopter(adopter);
    return adopterApi.sendForm(adopterJson).then((response) => {
      dispatch(sendAdopterFormSuccess(response));
    }).catch(err => {
      dispatch(sendAdopterFormError(err));
    });
  };
};

export const loadAdopters = (col, row, filterParam) => {
  return (dispatch) => {
  if (!filterParam) {
    return adopterApi.getAdopters(col, row).then(adopters => {
      dispatch(loadAdoptersSuccess(adopters, row));
    }).catch(err => {
      throw (err);
    });
  } else {
    let parsedFilters = parseFilter(filterParam);
    return adopterApi.getSerchAdopters(col, row, parsedFilters).then(adopters => {
      dispatch(loadSerchSuccess(adopters, row, filterParam));
    }).catch(err => {
      throw (err);
    });
  }
  };
};

export const cleanAdopters = () => {
  return (dispatch) => {
    dispatch(cleanAdoptersSuccess());
  };
};
