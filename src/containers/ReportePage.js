import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportList from '../components/reports/ReportList';
import * as actionsReport from '../actions/reportActions';
import '../styles/report-page.scss';

class ReportePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: true
    };

    this.onClickRefresh = this.onClickRefresh.bind(this);
  }

  componentWillMount() {
    let userId = this.props.user.id;
    if (userId) {
      this.props.actions.getReportList(userId);
      this.setState({ loading: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props;
    if (nextProps.user.id && nextProps.user != user) {
      let userId = nextProps.user.id;
      this.props.actions.getReportList(userId);
      this.setState({ userId });
    }
    if (nextProps.reports != this.props.reports) {
      this.setState({ loading: false });
    }
  }

  onClickRefresh() {
    let userId = this.props.user.id;
    this.props.actions.getReportList(userId);
    this.setState({ loading: true });
  }

  render() {
    const { loading } = this.state;
    const { reports } = this.props;
    return (
      <div className="report-page" >
        <button className="button-show refresh-button" onClick={this.onClickRefresh}>
            <i className="material-icons">loop</i>
        </button>
        <ReportList reports={reports} loading={loading} />
      </div>
    );
  }
}

const { array, object } = PropTypes;

ReportePage.propTypes = {
  reports: array.isRequired,
  user: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  reports: state.reports,
  user: state.user
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(actionsReport, dispatch),
  };
};

export default connect(mapState, mapDispatch)(ReportePage);
