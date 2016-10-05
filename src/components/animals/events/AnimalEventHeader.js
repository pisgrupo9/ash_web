import React, { PropTypes } from 'react';
import AddEventButton from '../events/AddEventButton';

const AnimalEventHeader = ({ id_route }) => {
  return (
    <div>
      <div className="animal-header">
        <div className="animal-header-title title">BUSQUEDA EVENTOS</div>
        <div className="float-right">
            <AddEventButton animalId={id_route} />
        </div>
      </div>
    </div>
  );
};

const { string } = PropTypes;

AnimalEventHeader.propTypes = {
  id_route: string.isRequired
};

export default AnimalEventHeader;
