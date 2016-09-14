import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import user from './userReducer';
import serverStatus from './serverStatusReducer';
import login from './loginReducer';
import userForm from './userFormReducer';
import resetPass from './passwordReducer';
import species from './speciesReducer';
import animalForm from './animalFormReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  user,
  serverStatus,
  login,
  userForm,
  resetPass,
  species,
  animalForm,
  toastr: toastrReducer,
  routing: routerReducer
});

export default rootReducer;
