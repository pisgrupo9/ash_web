import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/statistics.scss';
import Chartsfadsfadsf from 'chartjs';
import { Pie } from 'react-chartjs';

class EstadisticasPage extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let pieData = [
                  {
                      value: 300,
                      color:"#F7464A",
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
      responsive: true
    };
    return (
      <div className="statistic-page-flex">
        <div className="outer-flex">
          <div className="statistic-div inner-flex pie-div">
            <Pie data={pieData} options={chartOptions} />
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
