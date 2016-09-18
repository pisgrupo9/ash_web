import * as types from './actionTypes';
import { toastr } from 'react-redux-toastr';
import animalApi, { parseAnimal, parseImage } from '../api/animalApi';

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

export const sendImageSuccess = (success) => {
  return {
    type: types.SEND_IMAGE_SUCCESS,
    success
  };
};

export const sendImageError = (errors) => {
  return {
    type: types.SEND_IMAGE_ERROR,
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

export const showAnimalPerfilImages = (response) => {
  return {
    type: types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCES,
    response
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

export const sendProfilePic = (image) => {
  return (dispatch) => {
    let imageSend = parseImage(image);
    return animalApi.sendImage(imageSend).then(() => {
      toastr.success('', 'Nuevo animal creado con exito');
      dispatch(sendImageSuccess());
    }).catch(err => {
      dispatch(sendImageError(err));
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
      showPerfilAnimalImages(id_animal)(dispatch);
    }).catch(err => {
      throw (err);
    });
  };
};

export const showPerfilAnimalImages = (id_animal) => {
  return (dispatch) => {
    return animalApi.showAnimalImages(id_animal).then(animal => {
      dispatch(showAnimalPerfilImages(animal));
    }).catch(err => {
      throw (err);
    });
  };
};
