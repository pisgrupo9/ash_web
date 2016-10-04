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
    const { onChange, name } = this.props;
    let target = {
        name: name,
        value: date ? date.format('YYYY-MM-DD') : ''
    };
    onChange({ target });
   }

  render() {
    const { value, name, onChange } = this.props;
    let dateValue = null;
    if (value && value != '') {
      dateValue = moment(value, 'YYYY-MM-DD');
    }
    let mobileSize= (this.state.windowWidth < 450);
    const mobileView = (<input
                          type="date"
                          className="form-control date-picker"
                          name={name}
                          value={value}
                          onChange={onChange}
                          />);

    const webView = (<DatePicker
                      className="form-control date-picker"
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
  onChange: func.isRequired
};

export default DatePickerInput;
