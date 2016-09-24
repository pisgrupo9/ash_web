import * as types from './actionTypes';
import animalApi, { parseAnimal, parseImage } from '../api/animalApi';

export const sendAnimalFormSuccess = (response) => {
  return {
    type: types.SEND_ANIMAL_FORM_SUCCESS,
    response
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

export const showAnimalPerfilImages = (response) => {
  return {
    type: types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCES,
    response
  };
};

export const uploadImageAnimalSuccess = () => {
  return {
    type: types.UPLOAD_IMAGE_ANIMAL_SUCCESS
  };
};

export const uploadImageAnimalError = (errors) => {
  return {
    type: types.UPLOAD_IMAGE_ANIMAL_ERROR,
    errors
  };
};

export const loadAnimalsSuccess = (response) => {
  return {
    type: types.LOAD_ANIMALS_SUCCESS,
    response
  };
};

export const sendAnimalForm = (animal) => {
  return (dispatch) => {
    let animalJson = parseAnimal(animal);
    return animalApi.sendForm(animalJson).then((response) => {
      dispatch(sendAnimalFormSuccess(response));
    }).catch(err => {
      dispatch(sendAnimalFormError(err));
    });
  };
};

export const uploadImageAnimal = (image, id) => {
  return (dispatch) => {
    let imageJson = parseImage(image);
    return animalApi.uploadImage(imageJson, id).then(() => {
      dispatch(uploadImageAnimalSuccess());
    }).catch(err => {
      dispatch(uploadImageAnimalError(err));
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

export const showPerfilAnimalImages = (id_animal, page) => {
  return (dispatch) => {
    return animalApi.showAnimalImages(id_animal, page).then(animal => {
      dispatch(showAnimalPerfilImages(animal));
    }).catch(err => {
      throw (err);
    });
  };
};

export const loadAnimals = () => {
  return (dispatch) => {
    return animalApi.getAnimals().then(animals => {
      dispatch(loadAnimalsSuccess(animals));
    }).catch(err => {
      throw (err);
    });
  };
};
