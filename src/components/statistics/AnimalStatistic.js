import React, { PropTypes } from 'react';
import { Pie } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';

const AnimalStatistic = ({ info, loading, options }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  return (
    <div>
      <div className="statistic-title">Cantidad de animales en el sistema por especie:</div>
      { loading ? spinner : (<Pie data={info} options={options} />) }
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
