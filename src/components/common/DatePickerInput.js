import React, { Component, PropTypes } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class DatePickerInput extends Component {
   constructor(props, context) {
    super(props, context);

    this.state = {
      windowWidth: window.innerWidth
    };

    this.onChange = this.onChange.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
   window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  onChange(date) {
    const { onChange, name, type } = this.props;
    const isMonthType = type === 'month';
    const dateFormatValue = isMonthType ? 'YYYY-MM' : 'YYYY-MM-DD';
    let target = {
      name: name,
      value: date ? date.format(dateFormatValue) : ''
    };
    onChange({ target });
  }

  render() {
    const { value, name, onChange, type } = this.props;
    const isMonthType = type === 'month';
    const dateFormat = isMonthType ? 'MM/YYYY' : 'DD/MM/YYYY' ;
    const dateFormatValue = isMonthType ? 'YYYY-MM' : 'YYYY-MM-DD';
    let dateValue = value ? moment(value, dateFormatValue) : null;

    let mobileSize = (this.state.windowWidth < 450);

    const mobileView = (<input
                          type={type}
                          className="form-control date-picker"
                          name={name}
                          value={value}
                          onChange={onChange}
                          />);

    const webView = (<DatePicker
                      className="form-control date-picker"
                      dateFormat={dateFormat}
                      locale="es"
                      selected={dateValue}
                      onChange={this.onChange} />);

    return mobileSize ? mobileView : webView;
  }
}

const { string, func } = PropTypes;

DatePickerInput.propTypes = {
  styleClass: string,
  name: string.isRequired,
  value: string,
  type: string,
  onChange: func
};

export default DatePickerInput;
