import React, { Component, PropTypes } from 'react';
import AddGalleryModal from '../../containers/AddGalleryModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';

class AddGalleryButton extends Component {
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
    if (!this.props.disabled)
      this.setState({ showModal: true });
  }

  render() {
    const showButton = this.props.userPermission === 'animals_edit' || 'super_user';
    const button = (
                    <div>
                      <button className="button-add-images" onClick={this.onOpen}>
                        <Icon className={'add-button' + (this.props.disabled ? ' grey-color' : ' orange-color')} name="plus-circle"/>
                      </button>
                      <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                        <AddGalleryModal id={this.props.animalId} onClose={this.onClose} />
                      </Modal>
                    </div>
                  );

    return (
      <div>
        { showButton ? button : '' }
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
