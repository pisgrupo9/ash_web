import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import users from './userReducer';
import serverStatus from './serverStatusReducer';
import login from './loginReducer';

const rootReducer = combineReducers({
  users,
  serverStatus,
  login,
  routing: routerReducer
});

export default rootReducer;
