import React, { PropTypes } from 'react';
import AdopterAnimalItem from './AdopterAnimalItem';
import Spinner from '../../common/SpinnerComponent';
import '../../../styles/animal-list.scss';
import '../../../styles/adopter-perfil.scss';

const AdopterAnimals = ({ animals, onClick, selectedAnimalId, loading }) => {
  let animalsList;
  if (animals && animals.length) {
    animalsList = animals.map(animal => {
      return (
        <AdopterAnimalItem animal={animal} key={animal.id}
                                    selectedAnimalId={selectedAnimalId}
                                    onClick={onClick}/>
      );
    });
  } else {
    animalsList = <div className="no-result-search">El adoptante no tiene animales a su cargo.</div>;
  }
  return (
    <div className="adopted-container">
    { loading ? (<Spinner active={true} />) : (
      <div>
        <div className="titles-adopted-list">
          <div className="title-inside">NOMBRE</div>
          <div className="title-inside">ESPECIE</div>
          <div className="title-ficha">FICHA</div>
        </div>
        { animalsList }
      </div>
    )}
    </div>
  );
};

const { array, func, string, bool } = PropTypes;

AdopterAnimals.propTypes = {
  animals: array,
  onClick: func.isRequired,
  selectedAnimalId: string.isRequired,
  loading: bool.isRequired
};

export default AdopterAnimals;
