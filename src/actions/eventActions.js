import * as types from './actionTypes';
import eventApi, { parseEvent } from '../api/eventApi';
import animalApi from '../api/animalApi';
import { parseEventImage } from '../api/imagesApi';

export const sendEventFormSuccess = (response) => {
  return {
    type: types.SEND_EVENT_FORM_SUCCESS,
    response
  };
};

export const sendEventFormError = (errors) => {
  return {
    type: types.SEND_EVENT_FORM_ERROR,
    errors
  };
};

export const cancelEventForm = () => {
  return {
    type: types.CANCEL_EVENT_FORM
  };
};

export const uploadImageEventSuccess = () => {
  return {
    type: types.UPLOAD_IMAGE_EVENT_SUCCESS
  };
};

export const uploadImageEventError = (errors) => {
  return {
    type: types.UPLOAD_IMAGE_EVENT_ERROR,
    errors
  };
};

export const sendEventForm = (event, animalId) => {
  return (dispatch) => {
    let eventJson = parseEvent(event);
    return eventApi.sendForm(eventJson, animalId).then((response) => {
      dispatch(sendEventFormSuccess(response));
    }).catch(err => {
      dispatch(sendEventFormError(err));
    });
  };
};

export const uploadImageEvent = (image, eventId, animalId) => {
  return (dispatch) => {
    let imageJson = parseEventImage(image, eventId);
    return animalApi.uploadImage(imageJson, animalId).then(() => {
      dispatch(uploadImageEventSuccess());
    }).catch(err => {
      dispatch(uploadImageEventError(err));
    });
  };
};
