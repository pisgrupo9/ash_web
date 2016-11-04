import * as types from '../actions/actionTypes';
import initialState from './initialState';

const statisticReducer = (state = initialState.statistic, action) => {

  switch (action.type) {
    case types.REQUEST_ADOPTION_STATISTIC_SUCCESS: {
      let adoptStat = action.statInfo;
      return Object.assign({}, state, { adoptStat: adoptStat });
    }
    case types.REQUEST_ANIMAL_STATISTIC_SUCCESS: {
      let animalStat = action.statInfo;
      return Object.assign({}, state, { animalStat: animalStat });
    }
    case types.REQUEST_SPECIES_STATISTIC_SUCCESS: {
      let speciesStat = action.statInfo;
      return Object.assign({}, state, { speciesStat: speciesStat });
    }
    default:
      return state;
  }
};

export default statisticReducer;
