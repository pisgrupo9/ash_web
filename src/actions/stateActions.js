import * as constant from '../constants/apiConstants';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(constant.SECCION_STORAGE);
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }catch(e){
    return undefined;
  }
};

export const saveState = (token) =>{
    try{
      const serializedState = JSON.stringify(token);
      localStorage.setItem(constant.SECCION_STORAGE,serializedState);
    }catch(e){return;}
};