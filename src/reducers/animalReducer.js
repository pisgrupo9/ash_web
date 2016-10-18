import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalReducer = (state = initialState.animal, action) => {

  switch (action.type) {
    case types.SHOW_ANIMAL_PROFILE:
      return action.animal;
    default:
      return state;
  }
};

export default animalReducer;
