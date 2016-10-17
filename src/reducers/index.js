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
import eventForm from './eventFormReducer';
import confirm from './confirmReducer';
import events from './eventsReducer';
import event from './eventReducer';
import exportUrl from './exportReducer';
import reports from './reportReducer';
import adopterForm from './adopterFormReducer';
import adopters from './adoptersReducer';
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
  event,
  exportUrl,
  reports,
  adopterForm,
  adopters,
  toastr: toastrReducer,
  routing: routerReducer
});

export default rootReducer;
