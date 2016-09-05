import fetch from 'isomorphic-fetch';
import * as message from '../constants/apiMessage';

const handleErrors = (response) =>
  new Promise((resolve, reject) => {
    if (!response) {
      reject({ message: message.ERROR_RESPONSE_EMPTY});
      return;
    }

    if (response.ok) {
      resolve(response);
      return;
    }
    try{
    response.json()
      .then(json => {
        const error = json || { message: response.statusText };
        reject(error);
      });
    }catch(err){
      reject({message:message.ERROR_RESPONSE_NOT_JSON});
    }
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
    let requestData = {
      method: 'get',
      headers: {
        'Accept': 'application/json'
      }
    };
    return this.performRequest(uri,requestData);
  }
  post(uri,data) {
    let requestData = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    return this.performRequest(uri,requestData);
  }
  delete(uri,data) {
    let requestData = {
      method: 'delete',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(data)
    };
    return this.performRequest(uri,requestData);
  }
}

export default new Api();
