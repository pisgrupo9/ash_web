import * as session from '../actions/stateActions';

export const CheckAuth  = (nextState, replace) => {
  if (!isLogged()) {
   replace({
     pathname: '/login',
     state: { nextPathname: nextState.location.pathname }
   });
  }
};

export const isLogged = () => {
  let current_session = session.loadState();
  return(current_session && current_session.token);
};
