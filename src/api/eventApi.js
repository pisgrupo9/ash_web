import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class EventApi {
  static sendForm(event, animalId) {
    return api.post(`${consts.API_STAGING_URL}/animals/${animalId}/events`, event);
  }
}

export default EventApi;

export const parseEvent = (event) => {
  let parsedEvent = {
    event: Object.assign({}, event)
  };
  for (let prop in parsedEvent.event) {
    if (parsedEvent.event[prop] === '') {
      delete parsedEvent.event[prop];
    }
  }
  return parsedEvent;
};
