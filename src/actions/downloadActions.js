import * as types from './actionTypes';

export const download = (url) => {
  return {
    type: types.DOWNLOAD,
    url: url
  };
};

export const downloadXls = (url) => {
  return (dispatch) => {
    dispatch(download(url));
  };
};

export const downloadPdf = (url) => {
  return () => {
    window.open(url);
  };
};

