import { combineReducers } from 'redux';
import {routerReducer} from 'react-router-redux';
import users from './userReducer';
import serverStatus from './serverStatusReducer';

const rootReducer = combineReducers({
  users,
  serverStatus,
  routing: routerReducer
});

export default rootReducer;
