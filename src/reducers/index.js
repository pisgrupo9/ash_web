import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import user from './userReducer';
import serverStatus from './serverStatusReducer';
import login from './loginReducer';
import userForm from './userFormReducer';
import resetPass from './passwordReducer';
import species from './speciesReducer';
import animalForm from './animalFormReducer';
import animal from './animalReducer';
import animals from './animalsReducer';
<<<<<<< HEAD
import eventForm from './eventFormReducer';
<<<<<<< HEAD
import confirm from './confirmReducer';
=======
=======
import events from './eventsReducer';
>>>>>>> 868b628... Evento con funcionalidad basica sin galeria
>>>>>>> a9e30ad... Evento con funcionalidad basica sin galeria
import { reducer as toastrReducer } from 'react-redux-toastr';

const rootReducer = combineReducers({
  user,
  serverStatus,
  login,
  userForm,
  resetPass,
  species,
  animalForm,
  animal,
  animals,
  eventForm,
  confirm,
  events,
  toastr: toastrReducer,
  routing: routerReducer
});

export default rootReducer;
