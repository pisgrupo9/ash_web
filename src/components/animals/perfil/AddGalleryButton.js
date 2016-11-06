import React, { Component, PropTypes } from 'react';
import AddGalleryModal from '../../../containers/modal/AddGalleryModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class AddGalleryButton extends Component {
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
    if (!this.props.disabled)
      this.setState({ showModal: true, backdrop: true });
  }

  onToggleBackdrop() {
    const { backdrop } = this.state;
    this.setState({ backdrop: !backdrop });
  }

  render() {
    let { userPermission, disabled, animalId } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <div>
        <button className="button-add-images" data-tip data-for="add-galery" onClick={onOpen}>
          <Icon className={'add-button' + (disabled ? ' grey-color' : ' orange-color')}
                name="plus-circle"/>
        </button>
        <ReactTooltip id="add-galery" delayShow={500} place="left" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ANIMAL_IMG}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <AddGalleryModal id={animalId} {...{ onClose, onToggleBackdrop }} />
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

const { string, bool } = PropTypes;

AddGalleryButton.propTypes = {
  userPermission: string.isRequired,
  animalId: string.isRequired,
  disabled: bool
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(AddGalleryButton
);
