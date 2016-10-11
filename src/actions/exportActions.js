import * as types from './actionTypes';
import animalApi from '../api/animalApi';
import { toastr } from 'react-redux-toastr';
import * as messages from '../constants/apiMessage';

export const exportAnimalPerfil = (url, animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_PDF,
    url: url,
    animalId: animalId,
    id: id
  };
};

export const exportAnimalList = (url, id) => {
  return {
    type: types.EXPORT_ANIMALS_XLS,
    url: url,
    id: id
  };
};

export const exportAnimalPerfilStart = (animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_PDF_START,
    animalId: animalId,
    id: id
  };
};

export const exportAnimalListStart = (id) => {
  return {
    type: types.EXPORT_ANIMALS_XLS_START,
    id: id
  };
};

export const exportAnimal = (animalId) => {
  return (dispatch) => {
    let id = Math.floor((Math.random() * 10000) + 1);
    toastr.info('', messages.FICHA_CREADO);
    dispatch(exportAnimalPerfilStart(animalId, id));
    return animalApi.getExportAnimal(animalId).then((response) => {
      dispatch(exportAnimalPerfil(response.url, animalId, id));
      toastr.success('', messages.FICHA_TERMINDA);
    });
  };
};

export const exportAnimals = (filterParam) => {
  return (dispatch) => {
    let id = Math.floor((Math.random() * 10000) + 1);
    toastr.info('', messages.REPORTE_CREADO);
    dispatch(exportAnimalListStart(id));
    return animalApi.getExportAnimalsList(filterParam).then((response) => {
      dispatch(exportAnimalList(response.url, id));
      toastr.success('', messages.REPORTE_TERMINADO);
    });
  };
};
