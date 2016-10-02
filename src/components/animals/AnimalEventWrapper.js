import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import EventList from './EventList';
import AnimalEventHeader from './AnimalEventHeader';
import * as consts from '../../constants/apiConstants.js';
import '../../styles/animal-list.scss';

class AnimalEventWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { selectedEventId: '',
                    loading: true,
                    currPage: 1,
                    rows: consts.EVENT_PAGE_SIZE
   };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    this.props.actions.loadEvents(this.props.route_id, rows, currPage);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  onClick(eventId) {
    const equalsId = this.state.selectedEventId === eventId.toString();
    this.setState({ selectedEventId: equalsId ? '' : eventId.toString() });
    this.props.actions.showEvent(this.props.route_id, eventId.toString());
  }

  onClickViewMore() {
    let nextPage = this.state.currPage + 1;
    this.setState({ loading: true, currPage: nextPage });
    this.props.actions.loadEvents(this.props.route_id, this.state.rows, nextPage);
  }

  render() {
    const { events } = this.props;
    const showViewMore = this.state.currPage < events.total_pages;
    return (
      <div className="general-event-list">
        <AnimalEventHeader id_route={this.props.route_id} />
        <EventList events={events.events}
                    onClick={this.onClick}
                    selectedEventId={this.state.selectedEventId}
                    loading={this.state.loading}
                    onClickViewMore={this.onClickViewMore}
                    showViewMore={showViewMore} />
      </div>
    );
  }
}

const { object, string } = PropTypes;

AnimalEventWrapper.propTypes = {
  events: object.isRequired,
  actions: object.isRequired,
  route_id: string.isRequired
};

const mapState = (state) => ({
   events: state.events
 });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalEventWrapper);
