import api from './apiService.js';
import * as consts from '../constants/apiConstants.js';

class AdoptionApi {
  static addAdoption(adoption) {
    return api.post(`${consts.API_STAGING_URL}/adoptions`, adoption);
  }
}

export default AdoptionApi;

export const parseAdoption = (adopterId, animalId, date) => {
  const adoption = {
    adoption: {
      adopter_id: adopterId,
      animal_id: animalId,
      date
    }
  };
  return adoption;
};
