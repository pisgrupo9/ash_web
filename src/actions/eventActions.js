import * as types from './actionTypes';
import eventApi, { parseEvent, parseFilter } from '../api/eventApi';
import animalApi from '../api/animalApi';
import { parseEventImage } from '../api/imagesApi';
import * as consts from '../constants/apiConstants.js';

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

export const serchEventsStart = () => {
  return {
    type: types.SEARCH_EVENTS_START
  };
};

export const serchEventsSuccess = (response, filter) => {
  return {
    type: types.SEARCH_EVENTS_SUCCESS,
    filter: filter,
    response
  };
};

export const serchEventsError = (response) => {
  return {
    type: types.SEARCH_EVENTS_ERROR,
    response
  };
};

export const showEventSuccess = (response) => {
  return {
    type: types.SHOW_EVENT_SUCCESS,
    response
  };
};

export const cleanEventsSuccess = () => {
  return {
    type: types.CLEAN_EVENTS_SUCCESS
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

export const loadEvents = (animalId, filter, row, col) => {
  return (dispatch) => {
    if (!filter) {
      return eventApi.getEvents(animalId, row, col).then(events => {
        dispatch(loadEventsSuccess(events));
      }).catch(err => {
        throw (err);
      });
    } else {
      return eventApi.getSearchEvents(animalId, filter, row, col).then(events => {
        dispatch(loadEventsSuccess(events));
      }).catch(err => {
        throw (err);
      });
    }
  };
};

export const showEvent = (animalId, eventId) => {
  return (dispatch) => {
    return eventApi.getAnimalEvent(animalId, eventId).then(event => {
      dispatch(showEventSuccess(event));
    }).catch(err => {
      throw (err);
    });
  };
};

export const cleanEvents = () => {
  return (dispatch) => {
    dispatch(cleanEventsSuccess());
  };
};

export const searchEvent = (animalId, filter) => {
  return (dispatch) => {
    dispatch(serchEventsStart());
    let filterParams = parseFilter(filter);
    return eventApi.getSearchEvents(animalId, filterParams, consts.EVENT_PAGE_SIZE, 1)
    .then(response => {
      dispatch(serchEventsSuccess(response, filterParams));
    }).catch(err => {
      dispatch(serchEventsError(err));
    });
  };
};
