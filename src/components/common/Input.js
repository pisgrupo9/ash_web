import React, { PropTypes } from 'react';

const Input = ({ styleClass, name, label, type, onChange, onBlur, placeholder, value, error }) => {
  let wrapperClass = `form-group ${styleClass}`;

  if (error && error.length > 0) {
    wrapperClass += " " + 'has-error';
  }

  return (
    <div className={wrapperClass}>
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <div className="field">
        <input type={type}
               name={name}
               placeholder={placeholder}
               value={value}
               onChange={onChange}
               onBlur={onBlur}
               className="form-control" />
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
  type: string.isRequired,
  onChange: func.isRequired,
  onBlur: func,
  placeholder: string,
  value: string,
  error: string
};

export default Input;
