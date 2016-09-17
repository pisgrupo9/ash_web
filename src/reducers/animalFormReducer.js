import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalFormReducer = (state = initialState.animalForm, action) => {
  let animalForm = {
    errors: '',
    success: false,
    success_image: false
  };

  switch (action.type) {
    case types.SEND_ANIMAL_FORM_ERROR:
      animalForm.errors = action.errors.error;
      return animalForm;
    case types.SEND_ANIMAL_FORM_SUCCESS:
      animalForm.success = true;
      return animalForm;
    case types.CANCEL_ANIMAL_FORM:
      return animalForm;
    case types.SEND_IMAGE_SUCCESS:
      animalForm.success_image = true;
      return animalForm;
    default:
      return state;
  }
};

export default animalFormReducer;
