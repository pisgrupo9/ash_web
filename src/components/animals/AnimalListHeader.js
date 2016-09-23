import React from 'react';
import AddAnimalButton from './AddAnimalButton.js';

const AnimalListHeader = () => {
  return (
    <div>
      <div className="animal-header dark-grey-color">
        <div className="float-left">LISTADO</div>
        <div className="float-right"><AddAnimalButton /></div>
      </div>
      <div className="clear" />
    </div>
  );
};

export default AnimalListHeader;
