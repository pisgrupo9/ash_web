import React, { PropTypes } from 'react';

const Input = ({ styleClass, name, label, type, onChange, onBlur, onKeyPress, placeholder, value, error }) => {
  let wrapperClass = `form-group ${styleClass}`;

  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  const textAreaInput = type === "textarea";

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

  return (
    <div className={wrapperClass}>
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <div className="field">
        {textAreaInput ? textArea : input}
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
