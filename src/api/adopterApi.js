import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';
import _ from 'lodash';

class AdopterApi {
  static sendForm(adopter) {
    return api.post(`${consts.API_STAGING_URL}/adopters`, adopter);
  }

  static getAdopters(row, col) {
    return api.get(`${consts.APIARY_URL}/adopters`);
  }
}


export const parseAdopter = (adopter) => {
  let parsedAdopter = {};
  let splitFullName = _.words(adopter.fullName);
  adopter.firstName = splitFullName[0];
  adopter.lastName = splitFullName[1];
  for (let prop in adopter) {
    if (adopter[prop] !== '' && prop !== 'fullName') {
      let snakeProp = _.snakeCase(prop);
      if (prop === 'ci') {
        parsedAdopter[snakeProp] = _.replace(adopter[prop], '-', '');
      } else {
        parsedAdopter[snakeProp] = adopter[prop];
      }
    }
  }
  return parsedAdopter;
};

export const parseErrors = (errors) => {
  let parsedErrors = {};
  for (let prop in errors) {
    let camelProp = _.camelCase(prop);
    parsedErrors[camelProp] = errors[prop];
  }
  return parsedErrors;
};

export default AdopterApi;
