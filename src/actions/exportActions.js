import * as types from './actionTypes';
import animalApi from '../api/animalApi';
import eventApi from '../api/eventApi';
import { toastr } from 'react-redux-toastr';
import * as messages from '../constants/apiMessage';

export const exportAnimalPerfilStart = (animalId) => {
  return {
    type: types.EXPORT_ANIMAL_PDF_START,
    animalId
  };
};

export const exportAnimalListStart = () => {
  return {
    type: types.EXPORT_ANIMALS_XLS_START
  };
};

export const exportAnimalEventReportStart = (animalId) => {
  return {
    type: types.EXPORT_ANIMAL_EVENT_START,
    animalId,
  };
};

export const exportAnimal = (animalId) => {
  return (dispatch) => {
    return animalApi.getExportAnimal(animalId).then(() => {
      toastr.info('', messages.FICHA_CREADO);
      dispatch(exportAnimalPerfilStart(animalId));
    });
  };
};

export const exportAnimals = (filterParam) => {
  return (dispatch) => {
    return animalApi.getExportAnimalsList(filterParam).then(() => {
      toastr.info('', messages.REPORTE_CREADO);
      dispatch(exportAnimalListStart());
    });
  };
};

export const exportAnimalEvent = (animalId) => {
  return (dispatch) => {
    return eventApi.getExportAnimalEvent(animalId).then(() => {
      toastr.info('', messages.REPORTE_CREADO);
      dispatch(exportAnimalEventReportStart(animalId));
    });
  };
};
