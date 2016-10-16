import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function exportReducer(state = initialState.exportUrl, action) {

  switch (action.type) {
    case types.EXPORT_ANIMAL_PDF: {
      return { urlPdf: action.url, animalId: action.animalId };
    }
    case types.EXPORT_ANIMALS_XLS: {
      return { urlXls: action.url };
    }
    case types.EXPORT_ANIMAL_EVENT: {
      return { urlXls: action.url, animalId: action.animalId };
    }
    default: {
      return state;
    }
  }
}
