import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import UsersPage from './components/users/UsersPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={UsersPage} />
  </Route>
);
