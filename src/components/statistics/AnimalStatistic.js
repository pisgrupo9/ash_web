import React, { PropTypes } from 'react';
import { PieChart } from 'react-chartjs';

const AnimalStatistic = ( info ) => {
  return (
    <PieChart data={info}>
  );
};

const { object } = PropTypes;

AnimalStatistics.propTypes = {
  info: object.isRequired
};

export default AnimalStatistic;
