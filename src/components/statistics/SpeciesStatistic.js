import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';

const AdoptionStatistic = ({ info, loading, options, startDate, endDate, specie, species, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let title = "Cantidad de animales por especie ingresados en los últimos meses";
  return (
    <div className="species-stat-container">
      <div className="statistic-title">{title}:</div>
      <div className="species-statistic-container">
        <div className="dates-flex">
          <Input styleClass="stat-input-species"
                  name="startDate"
                  type="date"
                  label="Fecha Inicial"
                  value={startDate}
                  error={errors.startDate}
                  onChange={onChange} />
          <Input styleClass="stat-input-species"
                 name="endDate"
                 label="Fecha Final"
                 type="date"
                 value={endDate}
                 error={errors.endDate}
                 onChange={onChange} />
        </div>
        <div className="dates-flex">
          <SelectInput styleClass="stat-input-species"
                       name="specie"
                       label="Especie"
                       defaultOption="Especie"
                       value={specie}
                       error={errors.specie}
                       onChange={onChange}
                       options={species} />
          <div className="redraw-chart-button">
            <button className="button-show redraw-chart-button-style" onClick={onClick}>Ver Resultado</button>
          </div>
        </div>
      </div>
      { loading ? spinner : (<Line data={info} options={options} />) }
    </div>
  );
};

const { object, array, bool, string, func } = PropTypes;

AdoptionStatistic.propTypes = {
  info: object.isRequired,
  options: object.isRequired,
  loading: bool.isRequired,
  startDate: string.isRequired,
  endDate: string.isRequired,
  specie: string.isRequired,
  species: array.isRequired,
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
