import { expect } from 'chai';
import * as animalActions from '../actions/animalActions';
import * as types from '../actions/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import { parseAnimal } from '../api/animalApi';
import * as consts from '../constants/apiConstants.js';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';

describe('Animal Actions', () => {
  describe('Crear un animal', () => {

    it('devuelve la acción sendAnimalFormSuccess', () => {
      const response = 'Nuevo animal';
      const expectedAction = { type: types.SEND_ANIMAL_FORM_SUCCESS, response };
      const action = animalActions.sendAnimalFormSuccess(response);

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción sendAnimalFormError', () => {
      const errors = 'No se pudo crear';
      const expectedAction = { type: types.SEND_ANIMAL_FORM_ERROR, errors };
      const action = animalActions.sendAnimalFormError(errors);

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción cancelAnimalForm', () => {
      const expectedAction = { type: types.CANCEL_ANIMAL_FORM };
      const action = animalActions.cancelAnimalForm();

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción showAnimalPerfil', () => {
      const animal = {
        chip_num: '1',
        species_id: '1',
        sex: 'female',
        admission_date: '2010-10-10',
        name: 'Test',
        birthdate: '2010-10',
        race: 'beagle',
        death_date: '',
        castrated: false,
        vaccines: false,
        profile_image: 'image_data',
        weight: 15
      };
      const expectedAction = { type: types.SHOW_ANIMAL_PROFILE, animal };
      const action = animalActions.showAnimalPerfil(animal);

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción deleteAnimalSuccess', () => {
      const expectedAction = { type: types.DELETE_ANIMAL_SUCCESS };
      const action = animalActions.deleteAnimalSuccess();

      expect(action).to.deep.equal(expectedAction);
    });

    it('devuelve la acción deleteAnimalError', () => {
      const response = 'Error al borrar animal';
      const expectedAction = { type: types.DELETE_ANIMAL_ERROR, response };
      const action = animalActions.deleteAnimalError(response);

      expect(action).to.deep.equal(expectedAction);
    });
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  describe('Enviar el formulario de un animal con acciones asíncronas', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    describe('Exitoso', () => {

      it('Envío de un formulario de un animal', () => {
        const animal = {
          chip_num: '1',
          species_id: '1',
          sex: 'female',
          admission_date: '2010-10-10',
          name: 'Test',
          birthdate: '2010-8',
          race: 'beagle',
          death_date: '',
          castrated: false,
          vaccines: false,
          profile_image: 'image_data',
          weight: 15
        };
        nock(consts.API_STAGING_URL)
          .post('/animals', parseAnimal(animal))
          .reply(201, { id: 43 });

        it('Devuelve la acción sendAnimalFormSuccess con sendAnimalForm', () => {
          const expectedAction = {
            type: 'SEND_ANIMAL_FORM_SUCCESS', response: { id: 43 }
          };

          const store = mockStore(initialState);

          return store.dispatch(animalActions.sendAnimalForm(animal))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción sendAnimalFormSuccess cambia a success en el store', () => {
          const expectedAction = {
            type: 'SEND_ANIMAL_FORM_SUCCESS', response: { id: 43 }
          };

          const store = createStore(rootReducer, initialState);

          store.dispatch(expectedAction);
          expect(store.getState().animalForm.success).to.equal(true);
        });
      });
    });

    describe('Error al enviar el formulario del animal', () => {
      it('Cuando el nombre es vacío', () => {
        const animal = {
          chip_num: '1',
          species_id: '1',
          sex: 'female',
          admission_date: '2010-9-10',
          name: '',
          birthdate: '2010-10',
          race: 'beagle',
          death_date: '',
          castrated: false,
          vaccines: false,
          profile_image: 'image_data',
          weight: 15
        };
        nock(consts.API_STAGING_URL)
          .post('/animals', parseAnimal(animal))
          .reply(422, { error: { name: 'no puede estar en blanco' } });

        it('Devuelve la acción sendAnimalFormError con sendAnimalForm cuando el nombre esta vacío', () => {
          const store = mockStore(initialState.animalForm);
          const errors = 'no puede estar en blanco';
          const expectedAction = [{
            type: types.SEND_ANIMAL_FORM_ERROR, errors: { error: { name: errors } }
          }];

          return store.dispatch(animalActions.sendAnimalForm(animal))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción sendAnimalFormError guarda en el store el error', () => {
          const store = createStore(rootReducer, initialState);
          const errors = 'no puede estar en blanco';
          const expectedAction = {
            type: types.SEND_ANIMAL_FORM_ERROR, errors: { error: { name: errors } }
          };
          const expectedError = { name: errors };

          store.dispatch(expectedAction);
          expect(store.getState().animalForm.errors).to.deep.equal(expectedError);
        });
      });
      it('Cuando la fecha de nacimiento es posterior a la fecha de admisión', () => {
        const animal = {
          chip_num: '1',
          species_id: '1',
          sex: 'female',
          admission_date: '2010-10-10',
          name: 'Testito',
          birthdate: '2011-10',
          race: 'beagle',
          death_date: '',
          castrated: false,
          vaccines: false,
          profile_image: 'image_data',
          weight: 15
        };
        const errors = {
          birthdate: ['La fecha de nacimiento es inválida.'],
          admission_date: ['La fecha de ingreso es inválida.']
        };
        nock(consts.API_STAGING_URL)
          .post('/animals', parseAnimal(animal))
          .reply(422, { error: errors });
        it('Devuelve la acción sendAnimalFormError con sendAnimalForm', () => {
          const store = mockStore(initialState.animalForm);
          const expectedAction = [{
            type: types.SEND_ANIMAL_FORM_ERROR, errors: { error: errors }
          }];

          return store.dispatch(animalActions.sendAnimalForm(animal))
            .then(() => {
              expect(store.getActions()).to.deep.equal(expectedAction);
            });
        });

        it('La acción sendAnimalFormError guarda en el store el error', () => {
          const store = createStore(rootReducer, initialState);
          const expectedAction = {
            type: types.SEND_ANIMAL_FORM_ERROR, errors: { error: errors }
          };
          const expectedError = errors;

          store.dispatch(expectedAction);
          expect(store.getState().animalForm.errors).to.deep.equal(expectedError);
        });
      });
      it('Sin token', () => {
        const animal = {
          chip_num: '1',
          species_id: '1',
          sex: 'female',
          admission_date: '2010-10-10',
          name: '',
          birthdate: '2010-10',
          race: 'beagle',
          death_date: '',
          castrated: false,
          vaccines: false,
          profile_image: 'image_data',
          weight: 15
        };
        nock(consts.API_STAGING_URL)
          .post('/animals', parseAnimal(animal))
          .reply(422, { error: 'Debe proveer un token válido' });
        const store = mockStore(initialState.animalForm);
        const errors = 'Debe proveer un token válido';
        const expectedAction = [{
          type: types.SEND_ANIMAL_FORM_ERROR, errors: { error: errors }
        }];

        return store.dispatch(animalActions.sendAnimalForm(animal))
          .then(() => {
            expect(store.getActions()).to.deep.equal(expectedAction);
          });
      });
    });
  });
});
