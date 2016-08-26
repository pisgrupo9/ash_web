import fetch from 'isomorphic-fetch';

const handleErrors = (response) =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject({ message: 'No response returned from fetch' });
      return;
    }

    if (response.ok) {
      resolve(response);
      return;
    }

    response.json()
      .then(json => {
        const error = json || { message: response.statusText };
        reject(error);
      });
  });

const getResponseBody = (response) => {
  const bodyIsEmpty = response.status === 204;
  if (bodyIsEmpty) {
    return Promise.resolve();
  }
  return response.json();
};

class Api {
  performRequest(uri, requestData = {}) {
    return new Promise((resolve, reject) => {
      fetch(uri, requestData)
        .then(handleErrors)
        .then(getResponseBody)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  get(uri) {
    return this.performRequest(uri);
  }
}

export default new Api();
