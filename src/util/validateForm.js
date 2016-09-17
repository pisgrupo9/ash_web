import * as messages from '../constants/apiMessage';

export const validateEmptyField = (name, value) => {
  return value ? '' : messages.ERROR_REQUIRED_FIELD;
};

export const notErrors = (errors) => {
  let valid = true;
  for (let i in errors) {
    valid = valid && !errors[i];
  }
  return valid;
};
