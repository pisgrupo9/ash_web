import React, { PropTypes } from 'react';
import EventItem from "./EventItem";
import '../../../styles/animal-list.scss';
import SpinnerComponent from '../../common/SpinnerComponent';

const EventList = ({ events, infoEvent, onClick, selectedEventId, showViewMore, onClickViewMore, loading, loadingEvent }) => {
  const spinner = (<SpinnerComponent active={loading} />);

  return (
    <div>
      <div className="event-titles-container">
        <div className="title-inside">EVENTO</div>
        <div className="event-title-inside">FECHA</div>
      </div>
      <div className="events-container">
      { events.map(event => {
        return (
          <EventItem event={event}
                      infoEvent={infoEvent}
                      key={event.id}
                      selectedEventId={selectedEventId}
                      onClick={onClick}
                      loading={loadingEvent} />
        );
      })}
      <div className="view-more-container">
        {loading ? spinner : showViewMore ?
        <button className="button-show view-more-button" onClick={onClickViewMore}> Ver Más </button>: ''}
      </div>
      </div>
    </div>
  );
};

const { array, object, func, string, bool } = PropTypes;

EventList.propTypes = {
  events: array.isRequired,
  onClick: func.isRequired,
  onClickViewMore: func.isRequired,
  selectedEventId: string.isRequired,
  showViewMore: bool.isRequired,
  loading: bool.isRequired,
  infoEvent: object.isRequired,
  loadingEvent: bool.isRequired
};

export default EventList;
