import React, { PropTypes } from 'react';
import DatePickerInput from './DatePickerInput';

const Input = ({ styleClass, name, label, type, onChange, onBlur, onKeyPress, placeholder, value, error }) => {
  let wrapperClass = `form-group ${styleClass}`;

  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  const textAreaInput = type === 'textarea';
  const dateInput = type === 'date' || type === 'month' ;

  const input = (<input type={type}
                        name={name}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        onKeyPress={onKeyPress}
                        className="form-control" />);

  const textArea = (<textarea type={type}
                              name={name}
                              placeholder={placeholder}
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              className="form-control" />);

  const date = (<DatePickerInput
                          name={name}
                          value={value}
                          onChange={onChange}
                          type={type} />);

  const getInput = () => {
    if (textAreaInput) {
      return textArea;
    } else if (dateInput) {
      return date;
    } else {
      return input;
    }
  };

  return (
    <div className={wrapperClass}>
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <div className="field">
        { getInput() }
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const { string, func } = PropTypes;

Input.propTypes = {
  styleClass: string,
  name: string.isRequired,
  label: string,
  placeholder: string,
  type: string.isRequired,
  onChange: func.isRequired,
  onBlur: func,
  onKeyPress: func,
  value: string,
  error: string
};

export default Input;
