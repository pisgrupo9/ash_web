import * as types from '../actions/actionTypes';
import initialState from './initialState';
import moment from 'moment';

const createReport = (action, name, type) => {
  return {
    id: action.id,
    url: action.url,
    dateTime: moment().format("YYYY-MM-DD hh:mm:ss"),
    name: name,
    type: type,
    state: 'PENDIENTE'
  };
};

export default function reportReducer(state = initialState.reports, action) {
  switch (action.type) {
    case types.EXPORT_ANIMAL_PDF:
    case types.EXPORT_ANIMALS_XLS: {
      let reports = [];
      state.forEach( function (report) {
        if (!(report.id === action.id)) {
          reports.push(report);
        } else {
          let newItem = Object.assign({}, report);
          newItem.state = 'COMPLETO';
          newItem.url = action.url;
          reports.push(newItem);
        }
      });
      return reports;
    }
    case types.EXPORT_ANIMAL_PDF_START: {
      return [
      createReport(action, 'Ficha animal: '+ action.animalId, 'pdf'),
      ...state];
    }
    case types.EXPORT_ANIMALS_XLS_START: {
      return [
          createReport(action, 'Reporte', 'xls'),
            ...state ];
    }
    default: {
      return state;
    }
  }
}

