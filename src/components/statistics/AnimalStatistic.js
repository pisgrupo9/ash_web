import React, { PropTypes } from 'react';
import { Pie } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Legend from './Legend';

const AnimalStatistic = ({ info, loading, options }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  const pieChart = (<div className="pie-chart"><Pie data={info} options={options} /></div>);
  return (
    <div>
      <div className="statistic-title">Cantidad de animales en el sistema por especie:</div>
      { loading ? spinner : pieChart }
      { !loading && (<Legend info={info} />) }
    </div>
  );
};

const { object, bool, array } = PropTypes;

AnimalStatistic.propTypes = {
  info: array.isRequired,
  options: object.isRequired,
  loading: bool.isRequired
};

export default AnimalStatistic;
