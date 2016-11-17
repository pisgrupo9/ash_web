import { expect } from 'chai';
import animalFormReducer from '../reducers/animalFormReducer';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

describe('Animal Form Reducer', () => {

  it('Devuelve el estado inicial si ninguna acción coincide', () => {
    const action = { type: 'desconocida' };
    const expected = initialState.animalForm;

    expect(animalFormReducer(undefined, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SEND_ANIMAL_FORM_ERROR', () => {
    const errors = { error: types.SEND_ANIMAL_FORM_ERROR };
    const action = { type: types.SEND_ANIMAL_FORM_ERROR, errors };
    const expectedForm = {
      errors: types.SEND_ANIMAL_FORM_ERROR,
      success: false,
      success_image: false,
      sended_images: 0,
      id: '',
      deleteError: '',
      deleteSuccess: false
    };

    expect(animalFormReducer(initialState.animalForm, action)).to.deep.equal(expectedForm);
  });

  it('Maneja la acción SEND_ANIMAL_FORM_SUCCESS', () => {
    const response = { id: 1 };
    const action = { type: types.SEND_ANIMAL_FORM_SUCCESS, response };
    const expectedForm = {
      errors: '',
      success: true,
      success_image: false,
      sended_images: 0,
      id: response.id,
      deleteError: '',
      deleteSuccess: false
    };

    expect(animalFormReducer(initialState.animalForm, action)).to.deep.equal(expectedForm);
  });

  it('Maneja la acción CANCEL_ANIMAL_FORM', () => {
    const action = { type: types.CANCEL_ANIMAL_FORM };
    const expectedForm = {
      errors: '',
      success: false,
      success_image: false,
      sended_images: 0,
      id: '',
      deleteError: '',
      deleteSuccess: false
    };

    expect(animalFormReducer(initialState.animalForm, action)).to.deep.equal(expectedForm);
  });
});
