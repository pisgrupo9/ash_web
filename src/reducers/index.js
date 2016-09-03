import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import users from './userReducer';
import serverStatus from './serverStatusReducer';
import loginReducer from './loginReducer';

const rootReducer = combineReducers({
  users,
  serverStatus,
  loginReducer,
  routing: routerReducer
});

export default rootReducer;
