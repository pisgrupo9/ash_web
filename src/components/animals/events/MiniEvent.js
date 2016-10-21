import React, { PropTypes } from 'react';
import ImagesGallery from '../perfil/ImagesGallery';
import '../../../styles/animal-perfil.scss';
import '../../../styles/animal-form.scss';
import '../../../styles/animal-list.scss';
import SpinnerComponent from '../../common/SpinnerComponent';

const MiniEvent = ({ event, loading }) => {
  const spinner = (<SpinnerComponent active={loading} />);

  return (
    <div className="event-container">
      {loading ? spinner
              : <div className="event-description">
                {event.description}
                {event.images && event.images.length
                    ? <ImagesGallery images={event.images}
                      styleClass="event-gallery"
                      loading={false}
                      moreImages={false}/>
                    : ''}
                </div>}
    </div>
  );
};

const { object, bool } = PropTypes;

MiniEvent.propTypes = {
  event: object.isRequired,
  loading: bool.isRequired
};

export default MiniEvent;
