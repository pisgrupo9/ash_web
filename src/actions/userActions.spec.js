import { expect } from 'chai';
import * as userActions from '../actions/userActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as consts from '../constants/apiConstants.js';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

describe('User Actions', () => {
  describe('Crear una cuenta de un usuario', () => {

    it('devuelve la acción sendUserFormSuccess', () => {
      const expectedAction = { type: types.SEND_USER_FORM_SUCCESS };
      const action = userActions.sendUserFormSuccess();

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción sendUserFormError', () => {
      const errors = 'Error en el formulario';
      const expectedAction = { type: types.SEND_USER_FORM_ERROR, errors };
      const action = userActions.sendUserFormError(errors);

      expect(action).to.deep.equal(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('Enviar el formulario de un usuario con acciones asíncronas', () => {

    afterEach(() => {
      nock.cleanAll();
    });
    const history = ['http://example/solicitud-registro'];

    describe ('Exitoso', () => {

      const user = {
        name: 'Test One',
        email: 'test@gmail.com',
        phone: '099234567',
        password: 'password',
        password_confirmation: 'password'
      };

      it('de un usuario', () => {

        nock(consts.API_STAGING_URL)
          .post('/users', user)
          .reply(201);

        it('Devuelve la acción sendUserFormSuccess al ejecutar sendUserForm', () => {
          const expectedAction = [{ type: types.SEND_USER_FORM_SUCCESS }];
          const store = mockStore(initialState.userForm);
          store.dispatch(userActions.sendUserForm(user, history)).then(() => {
            expect(store.getActions()).to.deep.equal(expectedAction);
          });
        });

        it('La acción sendUserFormSuccess cambia el estado de la store...NADA', () => {
          const action = {
            type: types.SEND_USER_FORM_SUCCESS
          };
          const store = createStore(rootReducer, initialState);
          store.dispatch(action);
          expect(store.getState().userForm).to.not.equal({});
        });
      });
    });

    describe ('No exitoso', () => {

      const user = {
        name: 'Test One',
        email: 'test@gmail.com',
        phone: '099',
        password: 'password',
        password_confirmation: 'password'
      };
      const errors = 'no es válido.';

      it('de un usuario', () => {

        nock(consts.API_STAGING_URL)
          .post('/users', user)
          .reply(422, { error: { phone: 'no es válido.' } });

        it('Devuelve la acción sendUserFormError al ejecutar sendUserForm', () => {
          const expectedAction = [{ type: types.SEND_USER_FORM_ERROR, errors: { error: { phone: errors } } }];
          const store = mockStore(initialState.userForm);
          store.dispatch(userActions.sendUserForm(user, history)).then(() => {
            expect(store.getActions()).to.equal(expectedAction[0].errors);
          });
        });

        it('La acción sendUserFormError cambia el estado de la store con un error', () => {
          const action = { type: types.SEND_USER_FORM_ERROR, errors: { error: { phone: errors } } };
          const expectedError = { phone: errors };
          const store = createStore(rootReducer, initialState);
          store.dispatch(action);
          expect(store.getState().userForm.error).to.deep.equal(expectedError);
        });
      });
    });
  });
});
