import React, { PropTypes } from 'react';
import AnimalItem from "./AnimalItem";
import '../../styles/animal-list.scss';
import SpinnerComponent from '../common/SpinnerComponent';

const AnimalList = ({ animals, onClick, selectedAnimalId, showViewMore, onClickViewMore, loading }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  return (
    <div className="m-right30">
      <div className="titles-container">
        <div className="title-inside">NOMBRE</div>
        <div className="title-inside">ESPECIE</div>
        <div className="title-inside">ESTADO</div>
        <div className="title-ficha">FICHA</div>
      </div>
      { animals.map(animal => {
        return (
          <AnimalItem animal={animal} key={animal.id}
                                      selectedAnimalId={selectedAnimalId}
                                      onClick={onClick}/>
        );
      })}
      <div className="view-more-container">
        {loading ? spinner : showViewMore ?
        <button className="button-show view-more-button" onClick={onClickViewMore}> Ver Más </button>: ''}
      </div>
    </div>
  );
};

const { array, func, string, bool } = PropTypes;

AnimalList.propTypes = {
  animals: array.isRequired,
  onClick: func.isRequired,
  onClickViewMore: func.isRequired,
  selectedAnimalId: string.isRequired,
  showViewMore: bool.isRequired,
  loading: bool.isRequired
};

export default AnimalList;
