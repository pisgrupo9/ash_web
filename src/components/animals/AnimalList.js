import React, { PropTypes } from 'react';
import AnimalItem from "./AnimalItem";
import '../../styles/animal-list.scss';

const AnimalList = ({ animals, onClick, selectedAnimalId }) => {
  return (
    <div className="m-right30">
      <div className="titles-container">
        <div className="title-inside">NOMBRE</div>
        <div className="title-inside">ESPECIE</div>
        <div className="title-inside">ESTADO</div>
      </div>
      { animals.map(animal => {
        return (
          <AnimalItem animal={animal} key={animal.id}
                                      selectedAnimalId={selectedAnimalId}
                                      onClick={onClick}/>
        );
      })}
    </div>
  );
};

const { array, func, string } = PropTypes;

AnimalList.propTypes = {
  animals: array.isRequired,
  onClick: func.isRequired,
  selectedAnimalId: string.isRequired
};

export default AnimalList;
