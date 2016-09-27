import React from 'react';
import AddAnimalButton from './AddAnimalButton.js';

const AnimalListHeader = () => {
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title section-title">LISTADO</div>
        <div className="float-right"><AddAnimalButton /></div>
      </div>
    </div>
  );
};

export default AnimalListHeader;
