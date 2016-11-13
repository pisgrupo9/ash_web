import React, { PropTypes } from 'react';
import AdopterAnimalItem from './AdopterAnimalItem';
import Spinner from '../../common/SpinnerComponent';
import _ from 'lodash';
import '../../../styles/animal-list.scss';
import '../../../styles/adopter-perfil.scss';

const AdopterAnimals = ({ animals, onClick, selectedAnimalId, loading, blacklisted }) => {
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
    animalsList = (<div className="empty-state">
                    {blacklisted ? "El adoptante se encuentra en la lista negra"
                                          : "El adoptante no tiene animales a su cargo"}
                  </div>);
  }
  return (
    <div className="adopted-container">
    { loading ? (<Spinner active={true} />) : (
      <div>
        { !_.isEmpty(animals) &&
          <div className="titles-adopted-list">
            <div className="title-inside">NOMBRE</div>
            <div className="title-inside">ESPECIE</div>
            <div className="title-ficha">FICHA</div>
          </div>
        }
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
  loading: bool.isRequired,
  blacklisted: bool.isRequired
};

export default AdopterAnimals;
