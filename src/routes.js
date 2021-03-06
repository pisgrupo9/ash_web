import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './components/App';
import * as auth from './api/redirectLoginApi';
import ServerStatusPage from './containers/ServerStatusPage';
import LoginPage from './containers/LoginPage';
import CreateUserPage from './containers/CreateUserPage';
import LogoutPage from './containers/LogoutPage';
import ResetPasswordPage from './containers/ResetPasswordPage';
import UpdatePassPage from './containers/UpdatePassPage';
import AnimalListPage from './containers/AnimalListPage';
import AdoptantesPage from './containers/AdoptantesPage';
import EstadisticasPage from './containers/EstadisticasPage';
import AnimalPerfilPage from './containers/AnimalPerfilPage';
import AdopterPerfilPage from './containers/AdopterPerfilPage';
import ReportePage from './containers/ReportePage';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="animales"/>
    <Route path="serverStatus" component={ServerStatusPage}/>
    <Route path="login" onEnter={auth.CheckIfUnlogged} component={LoginPage}/>
    <Route path="solicitud-registro" onEnter={auth.CheckIfUnlogged} component={CreateUserPage}/>
    <Route path="logout" onEnter={auth.CheckAuth} component={LogoutPage}/>
    <Route path="reset" onEnter={auth.CheckIfUnlogged} component={ResetPasswordPage}/>
    <Route path="updatePass" onEnter={auth.CheckIfUnlogged} component={UpdatePassPage}/>
    <Route path="animales" onEnter={auth.CheckAuth} component={AnimalListPage}/>
    <Route path="animales/:id" onEnter={auth.CheckAuth} component={AnimalPerfilPage}/>
    <Route path="adoptantes/:id" onEnter={auth.CheckAuth} component={AdopterPerfilPage}/>
    <Route path="adoptantes" onEnter={auth.CheckAuth} component={AdoptantesPage}/>
    <Route path="estadisticas" onEnter={auth.CheckAuth} component={EstadisticasPage}/>
    <Route path="reportes" onEnter={auth.CheckAuth} component={ReportePage}/>
  </Route>
);
