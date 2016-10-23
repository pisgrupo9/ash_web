import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import * as eventActions from '../../../actions/eventActions';
import * as exportActions from '../../../actions/exportActions';
import EventList from './EventList';
import AnimalEventHeader from './AnimalEventHeader';
import SpinnerComponent from '../../common/SpinnerComponent';
import * as consts from '../../../constants/apiConstants.js';
import * as messages from '../../../constants/apiMessage';
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
      rows: consts.EVENT_PAGE_SIZE,
      evetnXls: false,
      eventXlsStart: true
    };

    this.onClick = this.onClick.bind(this);
    this.onClickViewMore = this.onClickViewMore.bind(this);
    this.exportXls = this.exportXls.bind(this);
  }

  componentWillMount() {
    let { rows, currPage } = this.state;
    let { animalId, events } = this.props;
    this.props.actions.loadEvents(animalId, events.filter, rows, currPage);
    this.setState({ evetnXls: false, eventStart: true });
  }

  componentWillReceiveProps(nextProps) {
    let { exportUrl } = this.props.exportUrl;
    let { animalId } = this.props;
    this.setState({ loadingMore: false, loadingEvent: false, loading: false });
    if (nextProps.events.firstPage) {
      this.setState({ currPage: 1 });
    }
    if (nextProps.exportUrl !== exportUrl && nextProps.exportUrl.sendXls && nextProps.exportUrl.animalId === animalId) {
      this.setState({ evetnXls: nextProps.exportUrl.sendXls });
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

  exportXls() {
    let { evetnXls, eventXlsStart } = this.state;
    let { animalId } = this.props;
    if (evetnXls) {
      toastr.warning('', messages.REPORTE_YA_CREADO);
    } else if (eventXlsStart) {
      this.setState({ eventXlsStart: false });
      this.props.exportActions.exportAnimalEvent(animalId);
    }
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
        <AnimalEventHeader animalId={this.props.animalId} onXlsExport={this.exportXls}/>
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
  animalId: string.isRequired,
  exportUrl: object.isRequired,
  exportActions: object.isRequired
};

const mapState = (state) => {
  return {
    event: state.event,
    events: state.events,
    exportUrl: state.exportUrl
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch),
    exportActions: bindActionCreators(exportActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalEventWrapper);
