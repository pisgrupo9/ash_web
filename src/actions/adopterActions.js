import * as types from './actionTypes';
import adopterApi, { parseAdopter, parseErrors } from '../api/adopterApi';

export const sendAdopterFormSuccess = (response) => {
  return {
    type: types.SEND_ADOPTER_FORM_SUCCESS,
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
