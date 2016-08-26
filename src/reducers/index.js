import { combineReducers } from 'redux';
import users from './userReducer';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  users,
  routing: routerReducer
});

export default rootReducer;
