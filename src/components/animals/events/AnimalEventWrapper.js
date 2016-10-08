import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../../actions/eventActions';
import EventList from './EventList';
import AnimalEventHeader from './AnimalEventHeader';
import SpinnerComponent from '../../common/SpinnerComponent';
import * as consts from '../../../constants/apiConstants.js';
import '../../../styles/animal-list.scss';

class AnimalEventWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedEventId: '',
      loadingMore: true,
      loadingEvent: true,
      loading: true,
      currPage: 1,
      rows: consts.EVENT_PAGE_SIZE
    };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    let { animalId, events } = this.props;
    this.props.actions.loadEvents(animalId, events.filter, rows, currPage);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ loadingMore: false, loadingEvent: false, loading: false });
    if (nextProps.events.firstPage) {
      this.setState({ currPage: 1 });
    }
  }

  componentWillUnmount() {
    this.props.actions.cleanEvents();
  }

  onClick(eventId) {
    const equalsId = this.state.selectedEventId === eventId.toString();
    this.setState({ loadingEvent: true, selectedEventId: equalsId ? '' : eventId.toString() });
    this.props.actions.showEvent(this.props.animalId, eventId.toString());
  }

  onClickViewMore() {
    let { currPage, rows } = this.state;
    let { animalId, events } = this.props;
    let nextPage = currPage + 1;
    this.setState({ loadingMore: true, currPage: nextPage });
    this.props.actions.loadEvents(animalId, events.filter, rows, nextPage);
  }

  render() {
    const { events, event } = this.props;
    const showViewMore = this.state.currPage < events.totalPages;
    const eventList = (<EventList events={events.events}
                                  infoEvent={event.event ? event.event : {}}
                                  onClick={this.onClick}
                                  selectedEventId={this.state.selectedEventId}
                                  loadingMore={this.state.loadingMore}
                                  loading={this.state.loading}
                                  loadingEvent={this.state.loadingEvent}
                                  onClickViewMore={this.onClickViewMore}
                                  showViewMore={showViewMore} />);
    const spinner = (<SpinnerComponent active={events.searchReady} />);

    return (
      <div className="general-event-list">
        <AnimalEventHeader animalId={this.props.animalId} />
        { events.searchReady ? spinner : eventList}
      </div>
    );
  }
}

const { object, string } = PropTypes;

AnimalEventWrapper.propTypes = {
  events: object.isRequired,
  event: object.isRequired,
  actions: object.isRequired,
  animalId: string.isRequired
};

const mapState = (state) => {
  return {
    event: state.event,
    events: state.events
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalEventWrapper);
