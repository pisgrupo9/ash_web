import React, { PropTypes } from 'react';
import { Line } from 'react-chartjs';
import SpinnerComponent from '../common/SpinnerComponent';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';
import moment from 'moment';

const AdoptionStatistic = ({ info, loading, options, startDate, endDate, showInfo, specie, species, errors, onChange, onClick }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let last3Months = "Cantidad de animales de tipo Perro ingresados en los últimos 3 meses";
  let startString = moment(showInfo.startDate).format("DD/MM/YYYY");
  let endString = moment(showInfo.endDate).format("DD/MM/YYYY");
  let dateDecided = `Cantidad de animales de especie ${showInfo.specie} ingresados del ${startString} al ${endString}`;
  return (
    <div className="species-stat-container">
      <div className="statistic-title">{ showInfo.startDate === '' ? last3Months : dateDecided }:</div>
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
        <SelectInput styleClass="stat-input"
                     name="specie"
                     label="Especie"
                     defaultOption="Especie"
                     value={specie}
                     onChange={onChange}
                     options={species} />
        <div className="redraw-chart-button">
          <button className="button-show" onClick={onClick}><i className="material-icons">play_arrow</i></button>
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
  showInfo: object.isRequired,
  specie: string.isRequired,
  species: array.isRequired,
  errors: object.isRequired,
  onChange: func.isRequired,
  onClick: func.isRequired
};

export default AdoptionStatistic;
