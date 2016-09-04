import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UsersPage from './components/users/UsersPage';
import ServerStatusPage from './components/serverStatus/ServerStatusPage';
import LoginPage from './components/login/LoginPage';
import CreateUserPage from './components/users/CreateUserPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ServerStatusPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="users" component={UsersPage}/>
    <Route path="solicitud-registro" component={CreateUserPage}/>
  </Route>
);
