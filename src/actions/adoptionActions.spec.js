import { expect } from 'chai';
import * as adoptionActions from '../actions/adoptionActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { parseAdoption } from '../api/adoptionApi';
import * as consts from '../constants/apiConstants.js';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

describe('Adoption Actions', () => {
  describe('Agregar una adopción', () => {

    it('devuelve la acción addAdoptionSuccess', () => {
      const response = 'Adopción exitosa';
      const expectedAction = { type: types.ADD_ADOPTION_SUCCESS, response };
      const action = adoptionActions.addAdoptionSuccess(response);

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción addAdoptionError', () => {
      const errors = 'Error al crear adopción';
      const expectedAction = { type: types.ADD_ADOPTION_ERROR, errors };
      const action = adoptionActions.addAdoptionError(errors);

      expect(action).to.deep.equal(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('Agregar una adopción con acciones asíncronas', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('Exitoso', () => {
      it ('De un solo animal', () => {
        const adopterId = 2;
        const animalId = 4;
        const date = '2016-11-17';
        const adoption = parseAdoption(adopterId, animalId, date);
        nock(consts.API_STAGING_URL)
          .post('/adoptions', adoption)
          .reply(201, { id: 1 });

        it('Devuelve la acción addAdoptionSuccess con sendAnimalForm', () => {
          const expectedAction = [{
            type: 'ADD_ADOPTION_SUCCESS', response: { id: 1 }
          }];

          const store = mockStore(initialState);

          return store.dispatch(adoptionActions.addAdoption(adopterId, animalId, date))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción addAdoptionSuccess cambia a success en el store', () => {
          const expectedAction = {
            type: 'ADD_ADOPTION_SUCCESS', response: { id: 1 }
          };

          const store = createStore(rootReducer, initialState);

          store.dispatch(expectedAction);
          expect(store.getState().adoptionForm.success).to.equal(true);
          expect(store.getState().adoptionForm.adoptionsSended).to.equal(1);
        });
      });

      it ('De varios animales a la vez', () => {
        const adopterId = 2 ;
        const animalId = [4, 6, 7];
        const date = '2016-11-17';
        const adoption = parseAdoption(adopterId, animalId, date);
        nock(consts.API_STAGING_URL)
          .post('/adoptions', adoption)
          .reply(201, { id_1: 1, id_2: 2, id_3: 3 });

        it('Devuelve la acción addAdoptionSuccess con sendAnimalForm', () => {
          const expectedAction = [{
            type: 'ADD_ADOPTION_SUCCESS', response: { id_1: 1, id_2: 2, id_3: 3 }
          }];

          const store = mockStore(initialState);

          return store.dispatch(adoptionActions.addAdoption(adopterId, animalId, date))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción addAdoptionSuccess cambia a success en el store', () => {
          const expectedAction = {
            type: 'ADD_ADOPTION_SUCCESS', response: { id_1: 1, id_2: 2, id_3: 3 }
          };

          const store = createStore(rootReducer, initialState);

          store.dispatch(expectedAction);
          expect(store.getState().adoptionForm.success).to.equal(true);
          expect(store.getState().adoptionForm.adoptionsSended).to.equal(3);
        });
      });
    });

    describe('No exitoso', () => {

      it('Cuando el token es inválido', () => {
        const adopterId = 1;
        const animalId = 9;
        const date = '2016-11-17';
        const adoption = parseAdoption(adopterId, animalId, date);
        const errors = 'Debe proveer un token válido';

        nock(consts.API_STAGING_URL)
          .post('/adoptions', adoption)
          .reply(422, { error: 'Debe proveer un token válido' });

        it('Devuelve la acción addAdoptionError con addAdoption', () => {
          const store = mockStore(initialState.animalForm);
          const expectedAction = [{
            type: types.ADD_ADOPTION_ERROR, errors: { errors: [errors] }
          }];

          return store.dispatch(adoptionActions.addAdoption(adopterId, animalId, date))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción addAdoptionError guarda en el store el error', () => {
          const store = createStore(rootReducer, initialState);
          const expectedAction = {
            type: types.ADD_ADOPTION_ERROR, errors: { errors: [errors] }
          };

          store.dispatch(expectedAction);
          expect(store.getState().adoptionForm.success).to.equal(false);
        });
      });
    });
  });
});
