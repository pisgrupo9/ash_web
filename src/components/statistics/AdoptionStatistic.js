import React, { PropTypes } from 'react';
import { Bar } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';
import moment from 'moment';

const AdoptionStatistic = ({ info, loading, options, startDate, endDate, showDates, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let last3Months = "Cantidad de animales adoptados en los últimos 3 meses";
  let startString = moment(startDate).format("DD/MM/YYYY");
  let endString = moment(endDate).format("DD/MM/YYYY");
  let dateDecided = `Cantidad de animales adoptados del ${startString} al ${endString}`;
  return (
    <div>
      <div className="statistic-title">{ showDates.startDate === '' ? last3Months : dateDecided }:</div>
      <div className="adoption-statistic-container">
        <Input styleClass="stat-input"
                name="startDate"
                label="Fecha Inicial"
                type="date"
                value={startDate}
                error={errors.startDate}
                onChange={onChange} />
        <Input styleClass="stat-input"
               name="endDate"
               label="Fecha Final"
               type="date"
               value={endDate}
               error={errors.endDate}
               onChange={onChange} />
        <div className="redraw-chart-button">
          <button className="button-show" onClick={onClick}><i className="material-icons">play_arrow</i></button>
        </div>
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
  startDate: string.isRequired,
  endDate: string.isRequired,
  showDates: object.isRequired,
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
