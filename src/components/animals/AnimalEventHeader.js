import React from 'react';
import AddEventButton from './events/AddEventButton';

const AnimalEventHeader = (id_route) => {
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title title">BUSQUEDA EVENTOS</div>
        <div className="float-right">
            <AddEventButton animalId={id_route.id_route} />
        </div>
      </div>
    </div>
  );
};

export default AnimalEventHeader;
