import React, { PropTypes } from 'react';
import DatePickerInput from './DatePickerInput';

const Input = ({ styleClass, name, label, type, showYearDropdown, onChange, onBlur, onKeyPress, placeholder, value, error, disabled }) => {
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
                        disabled={disabled}
                        className="form-control" />);

  const textArea = (<textarea type={type}
                              name={name}
                              placeholder={placeholder}
                              value={value}
                              onChange={onChange}
                              onBlur={onBlur}
                              disabled={disabled}
                              className="form-control" />);

  const date = (<DatePickerInput
                          name={name}
                          value={value}
                          onChange={onChange}
                          placeholder={placeholder}
                          showYearDropdown={showYearDropdown}
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

const { string, func, bool } = PropTypes;

Input.propTypes = {
  styleClass: string,
  name: string.isRequired,
  label: string,
  placeholder: string,
  type: string.isRequired,
  showYearDropdown: bool,
  onChange: func,
  onBlur: func,
  onKeyPress: func,
  value: string,
  error: string,
  disabled: bool
};

export default Input;
