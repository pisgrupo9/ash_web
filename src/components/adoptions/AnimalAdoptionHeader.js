import React, { PropTypes } from 'react';
import '../../styles/adoption.scss';
import AdoptionSearch from './AdoptionSearch';

const AnimalAdoptionHeader = ({ animalCount, onStartLoading }) => {
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
      <AdoptionSearch startLoading={onStartLoading}/>
    </div>
  );
};

const { number, func } = PropTypes;

AnimalAdoptionHeader.propTypes = {
  animalCount: number.isRequired,
  onStartLoading: func.isRequired
};

export default AnimalAdoptionHeader;
