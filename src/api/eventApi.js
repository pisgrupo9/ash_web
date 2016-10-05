import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class EventApi {
  static sendForm(event, animalId) {
    return api.post(`${consts.API_STAGING_URL}/animals/${animalId}/events`, event);
  }

  static getEvents(id_animal, row, col) {
    return api.get(`${consts.API_STAGING_URL}/animals/${id_animal}/events?page=${col}&row=${row}`);
  }

  static getAnimalEvent(id_animal, id_event) {
    return api.get(`${consts.API_STAGING_URL}/animals/${id_animal}/events/${id_event}`);
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
  parsedEvent.event.date = parsedEvent.event.date.format();
  return parsedEvent;
};
