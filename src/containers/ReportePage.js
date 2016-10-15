import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReportList from '../components/reports/ReportList';
import '../styles/report-page.scss';

class ReportePage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="report-page" >
        <ReportList reports={this.props.reports} />
      </div>
    );
  }
}

const { array } = PropTypes;

ReportePage.propTypes = {
  reports: array.isRequired
};

const mapState = (state) => ({
  reports: state.reports
});

export default connect(mapState)(ReportePage);
