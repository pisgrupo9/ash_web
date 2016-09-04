import * as constant from '../constants/apiConstants';

export const loadState = (key = constant.SECCION_STORAGE) => {
 try {
   const serializedState = localStorage.getItem(key);
   if(serializedState === null){
     return undefined;
   }
   return JSON.parse(serializedState);
 }catch(e){
   return undefined;
 }
};

export const saveState = (token, key = constant.SECCION_STORAGE) =>{
   try{
     const serializedState = JSON.stringify(token);
     localStorage.setItem(key, serializedState);
   }catch(e){return;}
};

export const deletState = (key = constant.SECCION_STORAGE) =>{
   try{
      localStorage.removeItem(key);
   }catch(e){return;}
};