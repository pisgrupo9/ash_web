import * as types from './actionTypes';
import adopterApi, { parseAdopter, parseErrors } from '../api/adopterApi';

export const sendAdopterFormSuccess = (response) => {
  return {
    type: types.SEND_ADOPTER_FORM_SUCCESS,
    response
  };
};

export const loadAdoptersSuccess = (response) => {
  return {
    type: types.LOAD_ADOPTERS_SUCCESS,
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

export const loadMoreAdoptersSuccess = (response) => {
  return {
    type: types.LOAD_MORE_ADOPTERS_SUCCESS,
    response
  };
};

export const loadBlacklistedSuccess = (response) => {
  return {
    type: types.LOAD_BLACKLISTED_SUCCESS,
    response
  };
};

export const loadMoreBlacklistedSuccess = (response) => {
  return {
    type: types.LOAD_MORE_BLACKLISTED_SUCCESS,
    response
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

export const loadAdopters = (col, row) => {
  return (dispatch) => {
    return adopterApi.getAdopters(col, row).then(adopters => {
      dispatch(loadAdoptersSuccess(adopters, col));
    }).catch(err => {
      throw (err);
    });
  };
};

export const loadMoreAdopters = (col, row) => {
  return (dispatch) => {
    return adopterApi.getAdopters(col, row).then(adopters => {
      dispatch(loadMoreAdoptersSuccess(adopters, col));
    }).catch(err => {
      throw (err);
    });
  };
};

export const loadBlacklisted = (col, row) => {
  return (dispatch) => {
    return adopterApi.getBlacklisted(col, row).then(adopters => {
      dispatch(loadBlacklistedSuccess(adopters, col));
    }).catch(err => {
      throw (err);
    });
  };
};

export const loadMoreBlacklisted = (col, row) => {
  return (dispatch) => {
    return adopterApi.getAdopters(col, row).then(adopters => {
      dispatch(loadMoreBlacklistedSuccess(adopters, col));
    }).catch(err => {
      throw (err);
    });
  };
};
