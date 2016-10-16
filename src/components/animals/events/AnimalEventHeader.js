import React, { PropTypes } from 'react';
import AddEventButton from '../events/AddEventButton';
import EventSearch from '../events/EventSearch';

const AnimalEventHeader = ({ animalId, onXlsExport }) => {
  return (
    <div>
      <div className="section-title-events">
        <p>EVENTOS
        <button
          className="btn btn-export exportEvent bg-dark-grey-color"
          onClick={onXlsExport}>XLS
        </button>
        </p>
        <AddEventButton animalId={animalId} />
      </div>
      <EventSearch animalId={animalId}/>
    </div>
  );
};

const { string, func } = PropTypes;

AnimalEventHeader.propTypes = {
  animalId: string.isRequired,
  onXlsExport: func.isRequired
};

export default AnimalEventHeader;
