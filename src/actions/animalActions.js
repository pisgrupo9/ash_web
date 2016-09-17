import * as types from './actionTypes';
import animalApi, { parseAnimal } from '../api/animalApi';
import { toastr } from 'react-redux-toastr';

export const sendAnimalFormSuccess = (success) => {
  return {
    type: types.SEND_ANIMAL_FORM_SUCCESS,
    success
  };
};

export const sendAnimalFormError = (errors) => {
  return {
    type: types.SEND_ANIMAL_FORM_ERROR,
    errors
  };
};

export const loadSpeciesSuccess = (response) => {
  return {
    type: types.LOAD_SPECIES_SUCCESS,
    response
  };
};

export const cancelAnimalForm = () => {
  return {
    type: types.CANCEL_ANIMAL_FORM
  };
};

export const showAnimalPerfil = (animal) => {
  return {
    type: types.SHOW_ANIMAL_PROFILE,
    animal
  };
};

export const sendAnimalForm = (animal) => {
  return (dispatch) => {
    let animalJson = parseAnimal(animal);
    return animalApi.sendForm(animalJson).then(() => {
      toastr.success('', 'Nuevo animal creado con exito');
      dispatch(sendAnimalFormSuccess());
    }).catch(err => {
      dispatch(sendAnimalFormError(err));
    });
  };
};

export const loadSpecies = () => {
  return (dispatch) => {
    return animalApi.getSpecies().then(species => {
      dispatch(loadSpeciesSuccess(species));
    }).catch(err => {
      throw (err);
    });
  };
};

export const showPerfilAnimal = (id_animal) => {
  return (dispatch) => {
    return animalApi.showAnimal(id_animal).then(animal => {
      dispatch(showAnimalPerfil(animal));
    }).catch(err => {
      throw (err);
    });
  };
};
