/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import { syncHistoryWithStore } from 'react-router-redux';
import './styles/styles.scss';
import { loadServerStatus } from './actions/serverStatusActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReduxToastr from 'react-redux-toastr';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(loadServerStatus());
render(
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} />
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        position="top-right"/>
    </div>
  </Provider>, document.getElementById('app')
);
