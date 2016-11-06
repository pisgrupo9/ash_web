import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import EditAnimalModal from '../../../containers/modal/EditAnimalModal';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class EditAnimalButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = { showModal: false };
    this.onClose = this.onClose.bind(this);
    this.onOpen = this.onOpen.bind(this);
  }

  onClose() {
    this.setState({ showModal: false });
  }

  onOpen() {
    this.setState({ showModal: true });
  }

  render() {
    const { loading, animal, routeId, userPermission } = this.props;
    const { onOpen, onClose } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <button
        type="button"
        className="btn btn-edit bg-orange-color"
        data-tip data-for="edit-animal"
        onClick={onOpen}>
        <i className="material-icons edit">mode_edit</i>
      </button>
    );

    return (
      <span>
        { showButton && button }
        <ReactTooltip id="edit-animal" delayShow={500} place="top" type="warning" effect="solid">
          {message.TOOLTIP_EDIT_ANIMAL}
        </ReactTooltip>
        <Modal show={this.state.showModal} onHide={onClose} bsSize="large">
          <EditAnimalModal {...{ loading, onClose, animal, routeId }} />
        </Modal>
      </span>
    );
  }
}

const { string, object, func } = PropTypes;

EditAnimalButton.propTypes = {
  userPermission: string.isRequired,
  animal: object.isRequired,
  routeId: string.isRequired,
  loading: func.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(EditAnimalButton);
