import React, { Component, PropTypes } from 'react';
import AddAdoptionModal from '../../containers/AddAdoptionModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import * as util from '../../util/validateForm';

class AddAdoptionButton extends Component {
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
    let { userPermission } = this.props;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
      <div>
        <button className="button-add-images" onClick={this.onOpen}>
          <Icon className="add-button orange-color" name="plus-circle"/>
        </button>
        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="lg">
          <AddAdoptionModal onClose={this.onClose} adopterId={this.props.adopterId} />
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
