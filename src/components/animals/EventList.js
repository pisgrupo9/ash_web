import React, { PropTypes } from 'react';
import EventItem from "./EventItem";
import '../../styles/animal-list.scss';
import SpinnerComponent from '../common/SpinnerComponent';

const EventList = ({ events, onClick, selectedEventId, showViewMore, onClickViewMore, loading }) => {
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
          <EventItem event={event} key={event.id}
                                      selectedEventId={selectedEventId}
                                      onClick={onClick}/>
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

const { array, func, string, bool } = PropTypes;

EventList.propTypes = {
  events: array.isRequired,
  onClick: func.isRequired,
  onClickViewMore: func.isRequired,
  selectedEventId: string.isRequired,
  showViewMore: bool.isRequired,
  loading: bool.isRequired
};

export default EventList;
