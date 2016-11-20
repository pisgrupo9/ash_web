import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import * as statisticActions from '../actions/statisticActions';
import * as animalActions from '../actions/animalActions';
import AnimalStatistic from '../components/statistics/AnimalStatistic';
import AdoptionStatistic from '../components/statistics/AdoptionStatistic';
import SpeciesStatistic from '../components/statistics/SpeciesStatistic';
import * as valid from '../util/validateForm';
import '../styles/statistics.scss';
import * as messages from '../constants/apiMessage';
import { getSpeciesName } from '../util/speciesUtils';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      datesAdoption: {
        startDate: moment().subtract(3, 'months').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD")
      },
      infoSpecies: {
        startDate: moment().subtract(3, 'months').format("YYYY-MM-DD"),
        endDate: moment().format("YYYY-MM-DD"),
        specie: '1'
      },
      loadingBar: true,
      loadingPie: true,
      loadingLine: true,
      loadingSpecies: true,
      adoptionErrors: {
        startDate: '',
        endDate: ''
      },
      speciesErrors: {
        startDate: '',
        endDate: '',
        specie: ''
      },
      showDatesAdoption: {
        startDate: '',
        endDate: ''
      },
      showInfoSpecies: {
        startDate: '',
        endDate: '',
        specie: ''
      },
      legend: '',
      mobile: window.innerWidth <= 541
    };

    this.onChangeAdoption = this.onChangeAdoption.bind(this);
    this.onChangeSpecies = this.onChangeSpecies.bind(this);
    this.onClickRefreshAdoption = this.onClickRefreshAdoption.bind(this);
    this.onClickRefreshSpecies = this.onClickRefreshSpecies.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentWillMount() {
      this.props.actions.loadDefaultAdoptionStatistic();
      this.props.actions.loadAnimalStatistic();
      this.props.actions.loadDefaultSpeciesStatistic();
      this.props.animalActions.loadSpecies();
      window.addEventListener('resize', this.handleResize);
    }

  componentWillReceiveProps(nextProps) {
    if (!_.isEmpty(nextProps.adoptStat)) {
      this.setState({ loadingBar: false });
    }
    if (!_.isEmpty(nextProps.animalStat)) {
      this.setState({ loadingPie: false });
    }
    if (!_.isEmpty(nextProps.species)) {
      this.setState({ loadingSpecies: false });
    }
    if (!_.isEmpty(nextProps.speciesStat)) {
      this.setState( { loadingLine: false });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    let mobile = window.innerWidth <= 541;
    this.setState({ mobile });
  }

  onClickRefreshAdoption() {
    let { startDate, endDate } = this.state.datesAdoption;
    if (moment(startDate).isSameOrAfter(endDate)) {
      let adoptionErrors = {
        endDate: messages.ERROR_GREATER_DATE("inicio")
      };
      this.setState({ adoptionErrors });
    } else if (valid.validateDateStatistic(endDate) && valid.validateDateStatistic(startDate)) {
      let adoptionErrors = { startDate: '', endDate: '' };
      this.setState({ adoptionErrors, loadingBar: true });
      this.props.actions.loadAdoptionStatistic(startDate, endDate);
      let showDatesAdoption = {};
      showDatesAdoption.startDate = startDate;
      showDatesAdoption.endDate = endDate;
      this.setState({ showDatesAdoption });
    } else {
      let startDateError = valid.validateDateStatistic(startDate) ? '' : messages.ERROR_LESS_DATE;
      let endDateError = valid.validateDateStatistic(endDate) ? '' : messages.ERROR_LESS_DATE;
      startDateError = startDate ? startDateError : messages.ERROR_REQUIRED_FIELD ;
      endDateError = endDate ? endDateError : messages.ERROR_REQUIRED_FIELD ;
      let adoptionErrors = {
        startDate: startDateError,
        endDate: endDateError
      };
      this.setState ({ adoptionErrors });
    }
  }

  onClickRefreshSpecies() {
    let { startDate, endDate, specie } = this.state.infoSpecies;
    if (moment(startDate).isSameOrAfter(endDate)) {
      let speciesErrors = {
        endDate: messages.ERROR_GREATER_DATE("inicio")
      };
      this.setState({ speciesErrors });
    } else if (!specie) {
      let speciesErrors = Object.assign({}, this.state.speciesErrors);
      speciesErrors.specie = messages.ERROR_REQUIRED_FIELD;
      this.setState({ speciesErrors });
    } else if (valid.validateDateStatistic(endDate) && valid.validateDateStatistic(startDate)) {
      let speciesErrors = { startDate: '', endDate: '' };
      this.setState({ speciesErrors, loadingLine: true });
      this.props.actions.loadSpeciesStatistic(startDate, endDate, specie);
      let speciesName = getSpeciesName(specie, this.props.species);
      let showInfoSpecies = {
        startDate,
        endDate,
        specie: speciesName
      };
      this.setState({ showInfoSpecies });
    } else {
      let startDateError = valid.validateDateStatistic(startDate) ? '' : messages.ERROR_LESS_DATE;
      let endDateError = valid.validateDateStatistic(endDate) ? '' : messages.ERROR_LESS_DATE;
      startDateError = startDate ? startDateError : messages.ERROR_REQUIRED_FIELD ;
      endDateError = endDate ? endDateError : messages.ERROR_REQUIRED_FIELD ;
      let speciesErrors = {
        startDate: startDateError,
        endDate: endDateError
      };
      this.setState ({ speciesErrors });
    }
  }

  onChangeAdoption(e) {
    const field = e.target.name;
    let { datesAdoption, adoptionErrors } = this.state;
    datesAdoption[field] = e.target.value;
    adoptionErrors[field] = valid.validateEmptyField(datesAdoption[field]);
    this.setState({ adoptionErrors, datesAdoption });
  }

  onChangeSpecies(e) {
    const field = e.target.name;
    let { infoSpecies, speciesErrors } = this.state;
    infoSpecies[field] = e.target.value;
    speciesErrors[field] = valid.validateEmptyField(infoSpecies[field]);
    this.setState({ speciesErrors, infoSpecies });
  }

  render() {
    let chartOptions = {
      responsive: true,
      maintainAspectRatio: true
    };
    let { adoptionErrors, speciesErrors, datesAdoption, showDatesAdoption, infoSpecies } = this.state;
    let { loadingPie, loadingBar, loadingLine, loadingSpecies } = this.state;
    return (
      <div className="statistic-page-flex">
        <div className="outer-flex">
          <div className="statistic-div pie-div">
            <AnimalStatistic info={this.props.animalStat}
                             options={chartOptions}
                             loading={loadingPie} />
          </div>
          <div className="statistic-div inner-flex">
            <AdoptionStatistic info={this.props.adoptStat}
                               options={chartOptions}
                               loading={loadingBar}
                               errors={adoptionErrors}
                               startDate={datesAdoption.startDate}
                               endDate={datesAdoption.endDate}
                               showDates={showDatesAdoption}
                               onChange={this.onChangeAdoption}
                               onClick={this.onClickRefreshAdoption} />
          </div>
        </div>
        <div className="inner-flex statistic-div">
          <SpeciesStatistic info={this.props.speciesStat}
                            options={chartOptions}
                            loading={loadingLine || loadingSpecies}
                            mobile={this.state.mobile}
                            errors={speciesErrors}
                            startDate={infoSpecies.startDate}
                            endDate={infoSpecies.endDate}
                            specie={infoSpecies.specie}
                            species={this.props.species}
                            onChange={this.onChangeSpecies}
                            onClick={this.onClickRefreshSpecies} />
        </div>
      </div>
    );
  }
}

const { object, array } = PropTypes;

EstadisticasPage.propTypes = {
  adoptStat: object.isRequired,
  animalStat: array.isRequired,
  speciesStat: object.isRequired,
  species: array.isRequired,
  actions: object.isRequired,
  animalActions: object.isRequired
};

const mapState = (state) => ({
  adoptStat: state.statistic.adoptStat,
  animalStat: state.statistic.animalStat,
  speciesStat: state.statistic.speciesStat,
  species: state.species
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(statisticActions, dispatch),
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EstadisticasPage);
