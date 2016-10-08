import * as messages from '../constants/apiMessage';

export const validateEmptyField = (value) => {
  return value ? '' : messages.ERROR_REQUIRED_FIELD;
};

export const notErrors = (errors) => {
  let valid = true;
  for (let i in errors) {
    valid = valid && !errors[i];
  }
  return valid;
};

export const lessThanToday = (date) => {
  let today = new Date();
  let newDate = new Date(date);
  const lessDate = newDate <= today;
  return lessDate ? '' : messages.ERROR_LESS_DATE;
};

export const compareDates = (date1, date2, dateName) => {
  let newDate1 = new Date(date1);
  let newDate2 = new Date(date2);
  const lessDate = newDate2 < newDate1;
  return lessDate ? '' : messages.ERROR_GREATER_DATE(dateName);
};

export const editAnimalPerfil = (perfil) => {
 return (perfil === 'animals_edit') || (perfil === 'super_user');
};

export const editAdopterPerfil = (perfil) => {
 return (perfil === 'adopters_edit') || (perfil === 'super_user');
};

export const requiredRace = (id) => {
  return id == '1' || id == '2' || id == '3';
};

export const getAge = (date) => {
  let today = new Date();
  const tokens = date.split("-");
  const age = today.getFullYear() - parseInt(tokens[0]);
  return age.toString();
};
