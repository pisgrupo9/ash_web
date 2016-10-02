import * as types from '../actions/actionTypes';
import initialState from './initialState';

const eventFormReducer = (state = initialState.eventForm, action) => {
  let eventForm = {
    errors: '',
    success: false,
    success_image: false,
    sended_images: state.sended_images,
    id: ''
  };

  switch (action.type) {
    case types.SEND_EVENT_FORM_ERROR:
      return Object.assign({}, state, { errors: action.errors.error });
    case types.SEND_EVENT_FORM_SUCCESS:
      return Object.assign({}, state, { errors: '', success: true, id: action.response.id });
    case types.CANCEL_EVENT_FORM:
      return eventForm;
    case types.UPLOAD_IMAGE_EVENT_SUCCESS: {
      let cantImages = state.sended_images + 1;
      return Object.assign({}, state, { success_image: true, sended_images: cantImages });
    }
    case types.UPLOAD_IMAGE_EVENT_ERROR: {
      let cantImages = state.sended_images + 1;
      return Object.assign({}, state, { success_image: false, sended_images: cantImages });
    }
    default:
      return state;
  }
};

export default eventFormReducer;
