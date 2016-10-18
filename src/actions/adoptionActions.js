import * as types from './actionTypes';
import adoptionApi, { parseAdoption } from '../api/adoptionApi';

export const addAdoptionSuccess = (response) => {
  return {
    type: types.ADD_ADOPTION_SUCCESS,
    response
  };
};

export const addAdoptionError = (errors) => {
  return {
    type: types.ADD_ADOPTION_ERROR,
    errors
  };
};

export const addAdoption = (adopterId, animalId, date) => {
  return (dispatch) => {
    let adoption = parseAdoption(adopterId, animalId, date);
    return adoptionApi.addAdoption(adoption).then((response) => {
      dispatch(addAdoptionSuccess(response));
    }).catch(err => {
      dispatch(addAdoptionError(err));
    });
  };
};

