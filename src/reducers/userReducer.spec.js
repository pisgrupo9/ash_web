import { expect } from 'chai';
import userReducer from './userReducer';
import * as types from '../actions/actionTypes';
import initialState from '../reducers/initialState';

describe('User Reducer', () => {

  it('Devuelve el estado inicial si ninguna acción coincide', () => {
    const action = { type: 'desconocida acción' };
    const expected = initialState.login;

    expect(userReducer(undefined, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SHOW_USER_LOGINS_SUCCESS', () => {
    const user = { email: 'test@example.com', password: 'password' };
    const action = { type: types.SHOW_USER_LOGINS_SUCCESS, user };
    const expected = user;

    expect(userReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción SHOW_USER_LOGINS_ERROR', () => {
    const action = { type: types.SHOW_USER_LOGINS_ERROR };
    const expected = {};

    expect(userReducer(initialState.login, action)).to.deep.equal(expected);
  });

  it('Maneja la acción LOGIN_USER_SUCCESS', () => {
    const action = { type: types.LOGIN_USER_SUCCESS };
    const expected = {};

    expect(userReducer(initialState.login, action)).to.deep.equal(expected);
  });
});
