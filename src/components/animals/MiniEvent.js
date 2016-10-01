import React, { PropTypes } from 'react';
import ImagesGallery from './ImagesGallery';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';
import '../../styles/animal-list.scss';

const MiniEvent = ({ event }) => {
  return (
      <div className="event-container">
        {event.description};
        <ImagesGallery images={event.images}
                            styleClass="slick-container"
                            loading={false}
                            moreImages={false}
                            />
      </div>
  );
};

const { object } = PropTypes;

MiniEvent.propTypes = {
  event: object.isRequired
};

export default MiniEvent;
