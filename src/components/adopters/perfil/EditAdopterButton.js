import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import EditAdopterModal from '../../../containers/modal/EditAdopterModal';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class EditAdopterButton extends Component {
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
    const { loading, adopter, adopterId, userPermission } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
      <span>
        <button className="btn-rec adopter bg-orange-color"
                data-tip data-for="edit-adopter"
                onClick={onOpen}>
          <i className="material-icons color">mode_edit</i>
        </button>
        <ReactTooltip id="edit-adopter" delayShow={500} place="top" type="warning" effect="solid">
            {message.TOOLTIP_EDIT_ADOPTER}
        </ReactTooltip>
      </span>
    );

    return (
      <span>
        { showButton && button }
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <EditAdopterModal {...{ loading, onClose, onToggleBackdrop, adopter, adopterId }} />
        </Modal>
      </span>
    );
  }
}

const { string, object, func } = PropTypes;

EditAdopterButton.propTypes = {
  userPermission: string.isRequired,
  adopter: object.isRequired,
  adopterId: string.isRequired,
  loading: func.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(EditAdopterButton);
