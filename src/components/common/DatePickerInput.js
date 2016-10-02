import React, { PropTypes } from 'react';
import DatePicker from 'react-datepicker';

const DatePickerInput = ({ styleClass, name, label, selected, locale, mobile, onChange, error }) => {
  let wrapperClass = `form-group ${styleClass}`;

  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  const mobileView = (<DatePicker
                        className="form-control date-picker"
                        locale={locale}
                        selected={selected}
                        onChange={onChange}
                        inline />);

  const webView = (<DatePicker
                    className="form-control date-picker"
                    locale={locale}
                    selected={selected}
                    onChange={onChange} />);

  return (
    <div className={wrapperClass}>
      {label && <label className="input-label" htmlFor={name}>{label}</label>}
      <div className="field">
        {mobile ? mobileView : webView}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

const { string, func, object, bool } = PropTypes;

DatePickerInput.propTypes = {
  styleClass: string,
  name: string.isRequired,
  label: string,
  selected: object.isRequired,
  locale: string,
  mobile: bool,
  onChange: func.isRequired,
  error: string
};

export default DatePickerInput;
