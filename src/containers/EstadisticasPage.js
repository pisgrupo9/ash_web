import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as statisticActions from '../actions/statisticActions';
import AnimalStatistic from '../components/statistics/AnimalStatistic';
import AdoptionStatistic from '../components/statistics/AdoptionStatistic';
import * as valid from '../util/validateForm';
import { parseAdopterStat } from '../api/statisticApi';
import '../styles/statistics.scss';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dates_adoption: {
        start_date: '',
        end_date: ''
      },
      loading: true,
      errors: {
        start_date: '',
        end_date: ''
      },
    };

    this.onChangeAdoption = this.onChangeAdoption.bind(this);
    this.onClickRefreshAdoption = this.onClickRefreshAdoption.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadDefaultAdoptionStatistic();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ loading: false });
    }
  }

  onClickRefreshAdoption() {
    if (valid.validateDateStatistic(this.state.dates_adoption.start_date, this.state.dates_adoption.end_date)) {
      let errors = { start_date: '', end_date: '' };
      this.setState({ errors: errors });
      this.setState({ loading: true });
      this.props.actions.loadAdoptionStatistic(this.state.start_date, this.state.end_date);
    } else {
      let errors = { start_date: "El rango maximo es 3 meses",
                      end_date: "El rango maximo es 3 meses"
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
    let pieData = [
                  {
                      value: 300,
                      color: "#F7464A",
                      highlight: "#FF5A5E",
                      label: "Red"
                  },
                  {
                      value: 50,
                      color: "#46BFBD",
                      highlight: "#5AD3D1",
                      label: "Green"
                  },
                  {
                      value: 100,
                      color: "#FDB45C",
                      highlight: "#FFC870",
                      label: "Yellow"
                  },
                  {
                      value: 40,
                      color: "#949FB1",
                      highlight: "#A8B3C5",
                      label: "Grey"
                  },
                  {
                      value: 120,
                      color: "#4D5360",
                      highlight: "#616774",
                      label: "Dark Grey"
                  }
              ];
    let chartOptions = {
      responsive: true,
      maintainAspectRatio: true,
      labels: {
        display: false
      }
    };

    let barData = [
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-09-26",
        "date_finish": "2016-10-02",
        "adoptions_count": 20
      },
      {
        "date_start": "2016-10-03",
        "date_finish": "2016-10-09",
        "adoptions_count": 40
      }
    ];
    return (
      <div className="statistic-page-flex">
        <div className="outer-flex">
          <div className="statistic-div inner-flex pie-div">
            <AnimalStatistic info={pieData}
                             options={chartOptions}
                             loading={this.state.loading} />
          </div>
          <div className="statistic-div inner-flex">
            <AdoptionStatistic info={parseAdopterStat(barData)}
                               options={chartOptions}
                               loading={this.state.loading}
                               errors={this.state.errors}
                               start_date={this.state.dates_adoption.start_date}
                               end_date={this.state.dates_adoption.end_date}
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

const { object } = PropTypes;

EstadisticasPage.propTypes = {
  adoption_statistic: object.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  adoption_statistic: state.adoptionStat
})

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(statisticActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EstadisticasPage);
