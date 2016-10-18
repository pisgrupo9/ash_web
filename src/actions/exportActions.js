import * as types from './actionTypes';
import animalApi, { parseFilter } from '../api/animalApi';
import eventApi from '../api/eventApi';
import { toastr } from 'react-redux-toastr';
import * as messages from '../constants/apiMessage';

export const exportAnimalPerfil = (url, animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_PDF,
    url,
    animalId,
    id
  };
};

export const exportAnimalList = (url, id) => {
  return {
    type: types.EXPORT_ANIMALS_XLS,
    url,
    id
  };
};

export const exportAnimalPerfilStart = (animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_PDF_START,
    animalId,
    id
  };
};

export const exportAnimalListStart = (id) => {
  return {
    type: types.EXPORT_ANIMALS_XLS_START,
    id
  };
};

export const exportAnimalEventReportStart = (animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_EVENT_START,
    animalId,
    id
  };
};

export const exportAnimalEventReport = (url, animalId, id) => {
  return {
    type: types.EXPORT_ANIMAL_EVENT,
    url,
    animalId,
    id
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
    let parsedFilter = parseFilter(filterParam);
    return animalApi.getExportAnimalsList(parsedFilter).then((response) => {
      dispatch(exportAnimalList(response.url, id));
      toastr.success('', messages.REPORTE_TERMINADO);
    });
  };
};

export const exportAnimalEvent = (animalId) => {
  return (dispatch) => {
    let id = Math.floor((Math.random() * 10000) + 1);
    toastr.info('', messages.REPORTE_CREADO);
    dispatch(exportAnimalEventReportStart(animalId, id));
    return eventApi.getExportAnimalEvent(animalId).then((response) => {
      dispatch(exportAnimalEventReport(response.url, animalId, id));
      toastr.success('', messages.REPORTE_TERMINADO);
    });
  };
};
