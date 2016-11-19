import { expect } from 'chai';
import userFormReducer from '../reducers/userFormReducer';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

describe('User Reducer', () => {

  it('Devuelve el estado inicial si ninguna acción coincide', () => {
    const action = { type: 'desconocida' };
    const expected = initialState.userForm;

    expect(userFormReducer(undefined, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SEND_USER_FORM_ERRORS', () => {
    const errors = { errors: types.SEND_USER_FORM_ERROR };
    const action = { type: types.SEND_USER_FORM_ERROR, errors };
    const expected = errors;

    expect(userFormReducer(initialState.userForm, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SEND_USER_UPDATE_PASS_ERROR', () => {
    const response = { errors: types.SEND_USER_UPDATE_PASS_ERROR };
    const action = { type: types.SEND_USER_UPDATE_PASS_ERROR, response };
    const expected = Object.assign(initialState.userForm, { errorPass: 'Server Error' });

    expect(userFormReducer(initialState.userForm, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SEND_USER_UPDATE_PASS_ERROR con reset_password_token', () => {
    const response = { errors: { reset_password_token: ['no es valido'] } };
    const action = { type: types.SEND_USER_UPDATE_PASS_ERROR, response };
    const expected = Object.assign(initialState.userForm, { errorPass: action.response.errors.reset_password_token[0] });

    expect(userFormReducer(initialState.userForm, action)).to.deep.equal(expected);
  });
});
