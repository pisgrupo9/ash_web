import React, { PropTypes } from 'react';
import AddEventButton from '../events/AddEventButton';
import EventSearch from '../events/EventSearch';

const AnimalEventHeader = ({ animalId }) => {
  return (
    <div>
      <div className="section-title-events">
        <p>EVENTOS</p>
        <AddEventButton animalId={animalId} />
      </div>
      <EventSearch animalId={animalId}/>
    </div>
  );
};

const { string } = PropTypes;

AnimalEventHeader.propTypes = {
  animalId: string.isRequired
};

export default AnimalEventHeader;
