import React, { PropTypes } from 'react';
import AnimalItem from "./AnimalItem";
import '../../styles/animal-list.scss';
import SpinnerComponent from '../common/SpinnerComponent';

const AnimalList = ({ animals, onClick, onCheck, selectedAnimalId, checkedAnimals, showViewMore, onClickViewMore, loading, loadingList }) => {
  const spinner = (<SpinnerComponent active={loading} />);
  let animalsList;
  if (animals.length) {
    animalsList = animals.map(animal => {
      return (
        <AnimalItem animal={animal} key={animal.id}
                                    selectedAnimalId={selectedAnimalId}
                                    checkedAnimals={checkedAnimals}
                                    onClick={onClick}
                                    onCheck={onCheck}/>
      );
    });
  } else {
    animalsList = !loading && (<div className="no-result-search">NO SE ENCONTRARON ANIMALES</div>);
  }

  return (
    <div>
      <div className={onCheck ? "titles-container-adoption" : "titles-container"}>
        <div className="title-inside">NOMBRE</div>
        <div className="title-inside">ESPECIE</div>
        <div className="title-inside">ESTADO</div>
        { !onCheck && (<div className="title-ficha">FICHA</div>) }
      </div>
      { !loadingList && animalsList }
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
  onCheck: func,
  onClickViewMore: func.isRequired,
  selectedAnimalId: string.isRequired,
  checkedAnimals: array,
  showViewMore: bool.isRequired,
  loading: bool.isRequired,
  loadingList: bool
};

export default AnimalList;
