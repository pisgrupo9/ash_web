import * as types from '../actions/actionTypes';
import initialState from './initialState';

const animalImagesReducer = (state = initialState.animalImages, action) => {

  switch (action.type) {
    case types.SHOW_ANIMAL_PROFILE_IMAGES_SUCCESS: {
      const { images, total_pages } = action.response;
      if (action.page > 1) {
        let newImages = state.images ? state.images : [];
        newImages = newImages.concat(images);
        return { uplaodImages: false, images: newImages, total_pages: total_pages };
      } else {
        return { uplaodImages: false, images: images, total_pages: total_pages };
      }
    }
    case types.UPLOAD_IMAGE_ANIMAL_SUCCESS: {
      return { uplaodImages: true, images: [], total_pages: 0 };
    }
    case types.UPLOAD_IMAGE_EVENT_SUCCESS: {
      return { uplaodImages: true, images: [], total_pages: 0 };
    }
    case types.REMOVE_IMAGE_ANIMAL_SUCCESS: {
      let images =[];
      state.images.forEach( function (image) {
        if (!(image.id === action.id_image)) {
          images.push(image);
        }
      });
      return Object.assign({}, state, { removeImages: true, images: images });
    }
    case types.REMOVE_IMAGE_ANIMAL_ERROR: {
      return { removeImages: true, error: action.response.error };
    }
    default:
      return state;
  }
};

export default animalImagesReducer;
