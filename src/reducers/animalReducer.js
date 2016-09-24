import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalReducer = (state = initialState.animal, action) => {

  switch (action.type) {
    case types.SHOW_ANIMAL_PROFILE:
      return action.animal;
    case types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCES: {
      let newImages = state.images ? state.images : [];
      const { images } = action.response;
      newImages=newImages.concat(images);
      return Object.assign({}, state, { uplaodImages: false, images: newImages });
    }
    case types.UPLOAD_IMAGE_ANIMAL_SUCCESS: {
      return Object.assign({}, state, { uplaodImages: true, images: [] });
    }
    default:
      return state;
  }
};

export default animalReducer;
