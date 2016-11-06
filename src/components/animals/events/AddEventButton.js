import React, { Component, PropTypes } from 'react';
import AddEventModal from '../../../containers/modal/AddEventModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import { bindActionCreators } from 'redux';
import * as eventActions from '../../../actions/eventActions';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class AddEventButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      backdrop: true
    };

    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
    this.onToggleBackdrop = this.onToggleBackdrop.bind(this);
  }

  onClose() {
    this.props.actions.cancelEventForm();
    this.setState({ showModal: false });
  }

  onOpen() {
    this.setState({ showModal: true, backdrop: true });
  }

  onToggleBackdrop() {
    const { backdrop } = this.state;
    this.setState({ backdrop: !backdrop });
  }

  render() {
    let { userPermission, animalId } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <div>
        <button className="button-add-images" data-tip data-for="add-event" onClick={onOpen}>
          <Icon className="add-button orange-color" name="plus-circle"/>
        </button>
        <ReactTooltip id="add-event" delayShow={500} place="left" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ANIMAL_EVENT}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <AddEventModal {...{ onClose, onToggleBackdrop, animalId }} />
        </Modal>
      </div>
    );

    return (
      <div>
        { showButton && button }
      </div>
    );
  }
}

const { string, object } = PropTypes;

AddEventButton.propTypes = {
  userPermission: string.isRequired,
  animalId: string.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddEventButton);
