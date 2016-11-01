import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as statisticActions from '../actions/statisticActions';
import AnimalStatistic from '../components/statistics/AnimalStatistic';
import AdoptionStatistic from '../components/statistics/AdoptionStatistic';
import * as valid from '../util/validateForm';
import '../styles/statistics.scss';
import * as messages from '../constants/apiMessage';
import moment from 'moment';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      datesAdoption: {
        startDate: '',
        endDate: ''
      },
      loadingBar: true,
      loadingPie: true,
      errors: {
        startDate: '',
        endDate: ''
      },
      showDatesAdoption: {
        startDate: '',
        endDate: ''
      }
    };

    this.onChangeAdoption = this.onChangeAdoption.bind(this);
    this.onClickRefreshAdoption = this.onClickRefreshAdoption.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadDefaultAdoptionStatistic();
    this.props.actions.loadAnimalStatistic();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adoptStat) {
      this.setState({ loadingBar: false });
    }
    if (nextProps.animalStat) {
      this.setState({ loadingPie: false });
    }
  }

  onClickRefreshAdoption() {
    let { startDate, endDate } = this.state.datesAdoption;
    if (moment(startDate).isSameOrAfter(endDate)) {
      let errors = {
        endDate: messages.ERROR_GREATER_DATE("inicio")
      };
      this.setState({ errors });
    } else if (valid.validateDateStatistic(startDate, endDate)) {
      let errors = { startDate: '', endDate: '' };
      this.setState({ errors, loadingBar: true });
      this.props.actions.loadAdoptionStatistic(startDate, endDate);
      let showDatesAdoption = {};
      showDatesAdoption.startDate = startDate;
      showDatesAdoption.endDate = endDate;
      this.setState({ showDatesAdoption });
    } else {
      let errors = {
        startDate: messages.ERROR_STATISTIC_RANGE,
        endDate: messages.ERROR_STATISTIC_RANGE
      };
      this.setState ({ errors });
    }
  }

  onChangeAdoption(e) {
    const field = e.target.name;
    let { datesAdoption, errors } = this.state;
    datesAdoption[field] = e.target.value;
    errors[field] = valid.validateEmptyField(datesAdoption[field]);
    this.setState({ errors, datesAdoption });
  }

  render() {
    let chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };
    let { loadingPie, loadingBar, errors, datesAdoption, showDatesAdoption } = this.state;
    return (
      <div className="statistic-page-flex">
        <div className="outer-flex">
          <div className="statistic-div inner-flex pie-div">
            <AnimalStatistic info={this.props.animalStat}
                             options={chartOptions}
                             loading={loadingPie} />
          </div>
          <div className="statistic-div inner-flex">
            <AdoptionStatistic info={this.props.adoptStat}
                               options={chartOptions}
                               loading={loadingBar}
                               errors={errors}
                               startDate={datesAdoption.startDate}
                               endDate={datesAdoption.endDate}
                               showDates={showDatesAdoption}
                               onChange={this.onChangeAdoption}
                               onClick={this.onClickRefreshAdoption} />
          </div>
        </div>
        <div className="inner-flex statistic-div">
            ESTADISTICA 3
        </div>
      </div>
    );
  }
}

const { object, array } = PropTypes;

EstadisticasPage.propTypes = {
  adoptStat: object.isRequired,
  animalStat: array.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  adoptStat: state.statistic.adoptStat,
  animalStat: state.statistic.animalStat
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(statisticActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EstadisticasPage);
