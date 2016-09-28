import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import EventList from './EventList';
import AnimalEventHeader from './AnimalEventHeader';
import '../../styles/animal-list.scss';

class AnimalEventWrapper extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { selectedEventId: '',
                    loading: true,
                    currPage: 1
   };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadEvents(this.props.route_id);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  onClick(eventId) {
    const equalsId = this.state.selectedEventId === eventId.toString();
    this.setState({ selectedEventId: equalsId ? '' : eventId.toString() });
  }

  render() {
    const { events } = this.props;
    return (
      <div className="general-list">
        <AnimalEventHeader />
        <EventList events={events}
                    onClick={this.onClick}
                    selectedEventId={this.state.selectedEventId}
                    loading={this.state.loading}/>
      </div>
    );
  }
}

const { array, object, string } = PropTypes;

AnimalEventWrapper.propTypes = {
  events: array.isRequired,
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
