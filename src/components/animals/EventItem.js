import React, { PropTypes } from 'react';
import { Collapse } from 'react-bootstrap';
import MiniEvent from './MiniEvent';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-list.scss';

const EventItem = ({ event, selectedEventId, onClick }) => {

  const focusedbutton = (<i className="material-icons arrow-button">arrow_drop_up</i>);
  const unfocusedbutton = (<i className="material-icons arrow-button">arrow_drop_down</i>);
  const showEvent = selectedEventId === event.id.toString();

  return (
    <div>
      <div className={showEvent ? 'selected-item-container' :'animal-item-container'}>
        <button className="button-show" onClick={() => onClick(event.id)}>
          {showEvent ? focusedbutton : unfocusedbutton}
        </button>
        <div className="animal-state-species"> {event.name} </div>
        <div className="animal-state-species"> {event.date} </div>
      </div>
      <Collapse in={showEvent}>
        <div>
          <MiniEvent event={event} />
        </div>
      </Collapse>
    </div>
  );
};

const { object, string, func } = PropTypes;

EventItem.propTypes = {
  event: object.isRequired,
  selectedEventId: string.isRequired,
  onClick: func.isRequired
};

export default EventItem;
