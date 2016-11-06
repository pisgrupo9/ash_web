import React, { Component, PropTypes } from 'react';
import AddAdoptionModal from '../../containers/modal/AddAdoptionModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import * as util from '../../util/validateForm';
import * as message from '../../constants/apiMessage';

class AddAdoptionButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showModal: false,
      backdrop: true,
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
    let { userPermission, adopterId } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
      <div>
        <button className="button-add-images" onClick={onOpen} data-tip data-for="add-adoption">
          <Icon className="add-button orange-color" name="plus-circle"/>
        </button>
        <ReactTooltip id="add-adoption" delayShow={500} place="top" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ADOPTER_ANIAML}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="lg">
          <AddAdoptionModal {...{ onClose, onToggleBackdrop, adopterId }} />
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

const { string } = PropTypes;

AddAdoptionButton.propTypes = {
  userPermission: string.isRequired,
  adopterId: string.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(AddAdoptionButton);
