import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function exportReducer(state = initialState.exportUrl, action) {

  switch (action.type) {
    case types.EXPORT_ANIMAL_PDF_START: {
      return { sendPdf: true, animalId: action.animalId };
    }
    case types.EXPORT_ANIMALS_XLS_START: {
      return { sendXls: true };
    }
    case types.EXPORT_ANIMAL_EVENT_START: {
      return { sendXls: true, animalId: action.animalId };
    }
    default: {
      return state;
    }
  }
}
