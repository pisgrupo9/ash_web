import * as types from '../actions/actionTypes';
import initialState from './initialState';

const statisticReducer = (state = initialState.adoptionStat, action) => {

  switch (action.type) {
    case types.REQUEST_ADOPTION_STATISTIC_SUCCESS:
      console.log(state);
      return action.response.datos;
    default:
      return state;
  }
};

export default statisticReducer;
