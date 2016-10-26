import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/statistics.scss';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="profile-page-flex">
        <div className="outer-flex">
          <div className="statistic-div inner-flex">
            ESTADISTICA 1
          </div>
          <div className="statistic-div inner-flex">
            ESTADISTICA 3
          </div>
        </div>
        <div className="inner-flex statistic-div">
          ESTADISTICA 3
        </div>
      </div>
    );
  }
}

const mapState = () => ({});

export default connect(mapState)(EstadisticasPage);
