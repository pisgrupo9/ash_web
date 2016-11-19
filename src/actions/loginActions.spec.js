import { expect } from 'chai';
import * as loginActions from '../actions/loginActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as consts from '../constants/apiConstants.js';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import { createStore } from 'redux';

describe('Login Actions', () => {
  describe('Crear la sesión de un usuario', () => {

    it('devuelve la acción loginUser', () => {
      const expectedAction = { type: types.LOGIN_USER_SUCCESS, response: undefined };
      const action = loginActions.loginUser();

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción loginError', () => {
      const expectedAction = { type: types.LOGIN_USER_ERROR, response: undefined };
      const action = loginActions.loginError();

      expect(action).to.deep.equal(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('Crear sesión de un usuario con acciones asíncronas', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    const history = ['http://example.com/'];
    const user = {
      email: 'example@gmail.com',
      password: 'password'
    };

    describe('Exitoso', () => {

      it('Cuando las credenciales son correctas', () => {
        nock(consts.API_STAGING_URL)
          .post('/users/sign_in', user)
          .reply(200, { token: 'abcd-1234' });

        it('Devuelve la acción loginUser con login', () => {

          const expectedAction = [{ type: types.LOGIN_USER_SUCCESS, response: { token: 'abcd-1234' } }];
          const store = mockStore(initialState.login);
          return store.dispatch(loginActions.login(user, history))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción loginUser cambia a success en el store', () => {

          const response = { 'user-token': 'abcd-1234' };
          const store = createStore(rootReducer, initialState);
          const action = loginActions.loginUser(response);

          store.dispatch(action);
          expect(store.getState().login.token).to.equal('abcd-1234');
        });
      });
    });

    describe('No exitoso', () => {

      it('Cuando las credenciales no son correctas', () => {
        nock(consts.API_STAGING_URL)
          .post('/users/sign_in', user)
          .reply(401, { error: 'Login incorrecto' });

        it('Devuelve la acción loginError con login', () => {
          const expectedAction = [{ type: types.LOGIN_USER_ERROR, response: { error: 'Login incorrecto' } }];
          const store = mockStore(initialState.user);
          return store.dispatch(loginActions.login(user, history))
            .then(() => {
              expect(store.getActions()[0].response).to.deep.equal(expectedAction[0].response);
            });
        });

        it('La acción loginError cambia a success en el store', () => {
          const action = {
            type: types.LOGIN_USER_ERROR, response: { error: 'Login incorrecto' }
          };
          const store = createStore(rootReducer, initialState);

          store.dispatch(action);
          expect(store.getState().login.errorLogin).to.equal('Login incorrecto');
        });
      });
    });
  });
});
