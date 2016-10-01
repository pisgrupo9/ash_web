import React, { PropTypes } from 'react';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';
import '../../styles/animal-list.scss';

const MiniEvent = ({ event }) => {
  return (
      <div className="event-container">
        {event.description};
        {event.images[1].image}
      </div>
  );
};

const { object } = PropTypes;

MiniEvent.propTypes = {
  event: object.isRequired
};

export default MiniEvent;
