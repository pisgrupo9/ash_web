export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('token')
    if(serializedState === null){
      return undefined;
    }
    return JSON.parse(serializedState);
  }catch(e){
    return undefined;
  }
}

export const saveState = (token) =>{
    try{
      const serializedState = JSON.stringify(token);
      localStorage.setItem('token',serializedState);
    }catch(e){}
} 
