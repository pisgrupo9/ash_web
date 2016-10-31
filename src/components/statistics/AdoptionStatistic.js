import React, { PropTypes } from 'react';
import { Bar } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';

const AdoptionStatistic = ({ info, loading, options, start_date, end_date, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  return (
    <div>
      <div className="statistic-title">Cantidad de animales adoptados del _ al _</div>
      <div className="adoption-statistic-container">
        <Input styleClass="stat-input"
                name="start_date"
                label="Fecha Inicial"
                type="month"
                value={start_date}
                error={errors.start_date}
                onChange={onChange} />
        <Input styleClass="stat-input"
               name="end_date"
               label="Fecha Final"
               type="month"
               value={end_date}
               error={errors.end_date}
               onChange={onChange} />
        <button onClick={onClick}><i className="material-icons">autorenew</i></button>
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
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
