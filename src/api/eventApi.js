import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class EventApi {

  static sendForm(event, animalId) {
    return api.post(`${consts.API_STAGING_URL}/animals/${animalId}/events`, event);
  }

  static getEvents(animalId, row, col) {
    return api.get(`${consts.API_STAGING_URL}/animals/${animalId}/events?page=${col}&row=${row}`);
  }

  static getAnimalEvent(animalId, eventId) {
    return api.get(`${consts.API_STAGING_URL}/animals/${animalId}/events/${eventId}`);
  }

  static getSearchEvents(animalId, filter, row, col) {
    return api.get(`${consts.API_STAGING_URL}/animals/${animalId}/events/search?page=${col}&row=${row}${filter}`);
  }

  static getExportAnimalEvent(animalId) {
    return api.get(`${consts.API_STAGING_URL}/animals/${animalId}/events/export_events`);
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
  parsedEvent.event.date = parsedEvent.event.date;
  return parsedEvent;
};

export const parseFilter = (filter) => {
  return `&text=${filter}`;
};
