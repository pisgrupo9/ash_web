import React, { PropTypes } from 'react';
import { Bar } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';
import { parseDate } from '../../api/statisticApi';

const AdoptionStatistic = ({ info, loading, options, start_date, end_date, show_dates, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let last3Months = "Cantidad de animales adoptados en los últimos 3 meses";
  let dateDecided = "Cantidad de animales adoptados del " + parseDate(show_dates.start_date) + " al " + parseDate(show_dates.end_date);
  return (
    <div>
      <div className="statistic-title">{ show_dates.start_date === '' ? last3Months : dateDecided }:</div>
      <div className="adoption-statistic-container">
        <Input styleClass="stat-input"
                name="start_date"
                label="Fecha Inicial"
                type="date"
                value={start_date}
                error={errors.start_date}
                onChange={onChange} />
        <Input styleClass="stat-input"
               name="end_date"
               label="Fecha Final"
               type="date"
               value={end_date}
               error={errors.end_date}
               onChange={onChange} />
        <button className="button-show" onClick={onClick}><i className="material-icons">play_arrow</i></button>
      </div>
      { loading ? spinner : (<Bar data={info} options={options} />) }
    </div>
  );
};

const { object, bool, string, func } = PropTypes;

AdoptionStatistic.propTypes = {
  info: object.isRequired,
  options: object.isRequired,
  loading: bool.isRequired,
  start_date: string.isRequired,
  end_date: string.isRequired,
  show_dates: object.isRequired,
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
