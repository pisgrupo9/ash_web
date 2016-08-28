import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UsersPage from './components/users/UsersPage';
import ServerStatusPage from './components/serverStatus/ServerStatusPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ServerStatusPage}/>
    <Route path="users" component={UsersPage}/>
  </Route>
);
