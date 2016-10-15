import React, { PropTypes } from 'react';
import AnimalItem from "./AnimalItem";
import '../../styles/animal-list.scss';
import SpinnerComponent from '../common/SpinnerComponent';

const AnimalList = ({ animals, onClick, selectedAnimalId, showViewMore, onClickViewMore, loading }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let animalsList;
  if (animals.length) {
    animalsList = animals.map(animal => {
      return (
        <AnimalItem animal={animal} key={animal.id}
                                    selectedAnimalId={selectedAnimalId}
                                    onClick={onClick}/>
      );
    });
  } else {
    animalsList = (<div className="no-result-search">NO SE ENCONTRARON ANIMALES</div>);
  }
  return (
    <div>
        <div className="titles-container">
        <div className="title-inside">NOMBRE</div>
        <div className="title-inside">ESPECIE</div>
        <div className="title-inside">ESTADO</div>
        <div className="title-ficha">FICHA</div>
      </div>
      { (!loading) && animalsList }
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
