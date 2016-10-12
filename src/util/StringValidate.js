export const isEmail = (text) => {
  const rexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))+$/;
  return rexEmail.test(text);
};

export const isPass = (text) => {
  return text && text.length >= 8 ;
};

export const isCi = (ci) => {
  let rexCi = /^[0-9]{6,7}[-]{0,1}[0-9]$/;
  return rexCi.test(ci);
};

export const onlyNumbers = (text) => {
  let rexNum = /^(0|[0-9][0-9]*)$/;
  return rexNum.test(text);
};
