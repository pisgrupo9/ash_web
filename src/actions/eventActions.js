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

export const loadEventsSuccess = (response) => {
  return {
    type: types.LOAD_EVENTS_SUCCESS,
    response
  };
};

export const showEventSucess = (response) => {
  return {
    type: types.SHOW_EVENT_SUCCESS,
    response
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

export const loadEvents = (animal_id, row, col) => {
  return (dispatch) => {
    return eventApi.getEvents(animal_id, row, col).then(events => {
      dispatch(loadEventsSuccess(events));
    }).catch(err => {
      throw (err);
    });
  };
};

export const showEvent = (animal_id, event_id) => {
  return (dispatch) => {
    return eventApi.getAnimalEvent(animal_id, event_id).then(event => {
      dispatch(showEventSucess(event));
    }).catch(err => {
      throw (err);
    });
  };
};
