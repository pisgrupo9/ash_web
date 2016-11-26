import React, { PropTypes } from 'react';
import '../../styles/adoption.scss';
import AdoptionSearch from './AdoptionSearch';
import Input from '../../components/common/Input';

const AnimalAdoptionHeader = ({ animalCount, adoptionDate, errorDate, onChange, onStartLoading }) => {
  let plural = animalCount > 1 ? 'seleccionados' : 'seleccionado';
  let animalsTitle = `(${animalCount} ${plural})`;

  return (
    <div>
      <div className="adoption-title-wrapper">
        <h4 className="adoption-form-title">
          AGREGAR ANIMALES
        </h4>
        <span className="adoption-form-subtitle">{Boolean(animalCount) && animalsTitle}</span>
      </div>
      <Input styleClass="date-input"
              name="adoptionDate"
              label="Fecha de Adopción"
              type="date"
              showYearDropdown={true}
              error={errorDate}
              value={adoptionDate}
              onChange={onChange}/>
      <AdoptionSearch startLoading={onStartLoading}/>
    </div>
  );
};

const { number, func, string } = PropTypes;

AnimalAdoptionHeader.propTypes = {
  animalCount: number.isRequired,
  adoptionDate: string.isRequired,
  errorDate: string.isRequired,
  onChange: func.isRequired,
  onStartLoading: func.isRequired
};

export default AnimalAdoptionHeader;
