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
    default:
      return state;
  }
};

export default statisticReducer;
