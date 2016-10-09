import * as types from './actionTypes';
import * as download from './downloadActions';
import animalApi from '../api/animalApi';

export const exportAnimalPerfil = (url) => {
  return {
    type: types.EXPORT_ANIMAL_PDF,
    url: url
  };
};

export const exportAnimalList = (url) => {
  return {
    type: types.EXPORT_ANIMALS_XLS,
    url: url
  };
};

export const exportAnimal = (animalId) => {
  return (dispatch) => {
    return animalApi.getExportAnimal(animalId).then((response) => {
      dispatch(exportAnimalPerfil(response.url));
      download.downloadPdf(response.url)(dispatch);
    });
  };
};

export const exportAnimals = (filterParam) => {
  return (dispatch) => {
    return animalApi.getExportAnimalsList(filterParam).then((response) => {
      dispatch(exportAnimalList(response.url));
      download.downloadXls(response.url)(dispatch);
    });
  };
};
