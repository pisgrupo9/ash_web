import * as types from './actionTypes';

export const confirmOpen = (confirm) => {
  return {
      type: types.CONFIRM_OPEN,
      confirm
  };
};

export const confirmDialog = (confirm) => {
  return (dispatch) => {
        dispatch(confirmOpen(confirm));
  };
};
