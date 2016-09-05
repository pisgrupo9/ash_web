import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import users from './userReducer';
import serverStatus from './serverStatusReducer';
import login from './loginReducer';
import userForm from './userFormReducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

const rootReducer = combineReducers({
  users,
  serverStatus,
  login,
  userForm,
  toastr: toastrReducer,
  routing: routerReducer
});

export default rootReducer;
