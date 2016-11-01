import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as statisticActions from '../actions/statisticActions';
import AnimalStatistic from '../components/statistics/AnimalStatistic';
import AdoptionStatistic from '../components/statistics/AdoptionStatistic';
import * as valid from '../util/validateForm';
import { parseAdopterStat, parseAnimalStat } from '../api/statisticApi';
import '../styles/statistics.scss';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dates_adoption: {
        start_date: '',
        end_date: ''
      },
      loadingBar: true,
      loadingPie: true,
      errors: {
        start_date: '',
        end_date: ''
      },
      show_dates_adoption: {
        start_date: '',
        end_date: '',
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
    if (valid.validateDateStatistic(this.state.dates_adoption.start_date, this.state.dates_adoption.end_date)) {
      let errors = { start_date: '', end_date: '' };
      this.setState({ errors: errors });
      this.setState({ loadingBar: true });
      this.props.actions.loadAdoptionStatistic(this.state.dates_adoption.start_date, this.state.dates_adoption.end_date);
      let show_dates_adoption = {};
      show_dates_adoption.start_date = this.state.dates_adoption.start_date;
      show_dates_adoption.end_date = this.state.dates_adoption.end_date;
      this.setState({ show_dates_adoption: show_dates_adoption });
    } else {
      let errors = { start_date: "El rango máximo es 3 meses",
                      end_date: "El rango máximo es 3 meses"
      };
      this.setState ({ errors: errors });
    }
  }

  onChangeAdoption(e) {
    const field = e.target.name;
    let dates_adoption = this.state.dates_adoption;
    dates_adoption[field] = e.target.value;
    let errors = this.state.errors;
    errors[field] = valid.validateEmptyField(dates_adoption[field]);
    this.setState({ errors });
    this.setState({ dates_adoption });
  }

  render() {
    let chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };
    return (
      <div className="statistic-page-flex">
        <div className="outer-flex">
          <div className="statistic-div inner-flex pie-div">
            <AnimalStatistic info={parseAnimalStat(this.props.animalStat)}
                             options={chartOptions}
                             loading={this.state.loadingPie} />
          </div>
          <div className="statistic-div inner-flex">
            <AdoptionStatistic info={parseAdopterStat(this.props.adoptStat)}
                               options={chartOptions}
                               loading={this.state.loadingBar}
                               errors={this.state.errors}
                               start_date={this.state.dates_adoption.start_date}
                               end_date={this.state.dates_adoption.end_date}
                               show_dates={this.state.show_dates_adoption}
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
  adoptStat: array.isRequired,
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
