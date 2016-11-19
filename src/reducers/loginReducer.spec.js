import { expect } from 'chai';
import loginReducer from './loginReducer';
import * as types from '../actions/actionTypes';
import * as message from '../constants/apiMessage';
import initialState from '../reducers/initialState';

describe('Login Reducer', () => {

  it('Devuelve el estado inicial si ninguna acción coincide', () => {
    const action = { type: 'desconocida' };
    const expected = initialState.login;

    expect(loginReducer(undefined, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_SUCCESS', () => {
    const response = { 'user-token': 'nuevoToken' };
    const action = { type: types.LOGIN_USER_SUCCESS, response };
    const expected = { token: 'nuevoToken' };

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGOUT_USER', () => {
    const action = { type: types.LOGOUT_USER };
    const expected = {};

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_ERROR cuando el error es authentication-error', () => {
    const response = { error: 'authentication error' };
    const action = { type: types.LOGIN_USER_ERROR, response };
    const expected = { errorLogin: message.ERROR_AUTHENTICATION };

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_ERROR', () => {
    const response = { error: 'another error' };
    const action = { type: types.LOGIN_USER_ERROR, response };
    const expected = { errorLogin: response.error };

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_ERROR', () => {
    const response = { error: 'Server Error' };
    const action = { type: types.LOGIN_USER_ERROR, response };
    const expected = { errorLogin: 'Server Error' };

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_ERROR cuando hay varios errores', () => {
    const response = { errors: ['error1'] };
    const action = { type: types.LOGIN_USER_ERROR, response };
    const expected = { errorLogin: response.errors[0] };

    expect(loginReducer(initialState.login, action)).to.deep.equal(expected);
  });
});
