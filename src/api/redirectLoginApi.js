import * as session from '../actions/sessionActions';

export const CheckAuth = (nextState, replace) => {
  if (!isLogged()) {
   replace({
     pathname: '/login',
     state: { nextPathname: nextState.location.pathname }
   });
  }
};

export const isLogged = () => {
  let current_session = session.loadSession();
  return (current_session && current_session.email && current_session.token);
};

export const CheckIfUnlogged = (nextState, replace) => {
  if (isLogged()) {
    replace({
      pathname: '/logout',
      state: { nextPathname: nextState.location.pathname }
    });
  }
};

export default CheckAuth;
