import * as constant from '../constants/apiConstants';
import loginPatch from '../util/loginPatch';

export const loadSession = () => {
  try {
    const serializedState = localStorage.getItem(constant.SECCION_STORAGE);
    if (serializedState === null) {
      localStorage.setItem('stub', 'stub');
      localStorage.removeItem('stub');
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    let session = new loginPatch();
    return session.getSession();
  }
};

export const saveSession = (token) => {
  try {
    const serializedState = JSON.stringify(token);
    localStorage.setItem(constant.SECCION_STORAGE, serializedState);
  } catch (e) {
    let session = new loginPatch();
    session.setSession(token.id, token.token, token.email);
  }
};

export const deleteSession = (key = constant.SECCION_STORAGE) => {
  try {
    localStorage.removeItem(key);
    localStorage.setItem('stub', 'stub');
    localStorage.removeItem('stub');
  } catch (e) {
    let session = new loginPatch();
    session.deleteSession();
  }
};
