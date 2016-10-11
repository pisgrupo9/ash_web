import * as types from './actionTypes';
import animalApi from '../api/animalApi';
import { toastr } from 'react-redux-toastr';
import * as messages from '../constants/apiMessage';

export const exportAnimalPerfil = (url, animalId) => {
  return {
    type: types.EXPORT_ANIMAL_PDF,
    url: url,
    animalId: animalId
  };
};

export const exportAnimalList = (url) => {
  return {
    type: types.EXPORT_ANIMALS_XLS,
    url: url
  };
};

export const exportAnimal = (animalId) => {
  toastr.info('', messages.FICHA_CREADO);
  return (dispatch) => {
    return animalApi.getExportAnimal(animalId).then((response) => {
      dispatch(exportAnimalPerfil(response.url, animalId));
      toastr.success('', messages.FICHA_TERMINDO);
    });
  };
};

export const exportAnimals = (filterParam) => {
  toastr.info('', messages.REPORTE_CREADO);
  return (dispatch) => {
    return animalApi.getExportAnimalsList(filterParam).then((response) => {
      dispatch(exportAnimalList(response.url));
      toastr.success('', messages.REPORTE_TERMINDO);
    });
  };
};
