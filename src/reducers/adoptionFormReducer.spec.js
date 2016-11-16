import { expect } from 'chai';
import adoptionFormReducer from '../reducers/adoptionFormReducer';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

describe('Adoption Form Reducer', () => {
  const getAppState = () => {
    return {
      adoptionsSended: 1,
      success: true
    };
  };

  it('Devuelve el estado inicial si ninguna acción coincide', () => {
    const action = { type: 'desconocida' };
    const expected = initialState.adoptionForm;

    expect(adoptionFormReducer(undefined, action)).to.deep.equal(expected);
  });

  it('Maneja la acción ADD_ADOPTION_ERROR', () => {
    const errors = { error: types.ADD_ADOPTION_ERROR };
    const action = { type: types.ADD_ADOPTION_ERROR, errors };
    const expectedAdoptionForm = {
      success: false,
      adoptionsSended: 2,
    };

    expect(adoptionFormReducer(getAppState(), action)).to.deep.equal(expectedAdoptionForm);
  });

  it('Maneja la acción ADD_ADOPTION_SUCCESS', () => {
    const response = { id: 1 };
    const action = { type: types.ADD_ADOPTION_SUCCESS, response };
    const expectedAdoptionForm = {
      success: true,
      adoptionsSended: 2,
    };

    expect(adoptionFormReducer(getAppState(), action)).to.deep.equal(expectedAdoptionForm);
  });
});
