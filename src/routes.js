import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UsersPage from './components/users/UsersPage';
import ServerStatusPage from './components/serverStatus/ServerStatusPage';
import LoginPage from './components/login/LoginPage';
import CreateUserPage from './components/users/CreateUserPage';
import LogoutPage from './components/logout/LogoutPage';
import * as auth from './api/redirectLoginApi';
import ResetPasswordPage from './components/reset/ResetPasswordPage';
import UpdatePassPage from './components/updatePass/UpdatePassPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ServerStatusPage}/>
    <Route path="serverStatus" component={ServerStatusPage}/>
    <Route path="login" component={LoginPage}/>
    <Route path="users" component={UsersPage}/>
    <Route path="solicitud-registro" component={CreateUserPage}/>
    <Route path="logout" onEnter={auth.CheckAuth} component={LogoutPage}/>
    <Route path="reset" onEnter={auth.CheckIfUnlogged} component={ResetPasswordPage}/>
    <Route path="updatePass" component={UpdatePassPage}/>
  </Route>
);
