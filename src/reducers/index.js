import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import users from './userReducer';
import serverStatus from './serverStatusReducer';
import login from './loginReducer';
import userForm from './userFormReducer';

const rootReducer = combineReducers({
  users,
  serverStatus,
  login,
  userForm,
  routing: routerReducer
});

export default rootReducer;
