import React, { Component, PropTypes } from 'react';
import EditAnimalModal from '../../containers/EditAnimalModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';

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
    const showButton = this.props.userPermission === 'animals_edit';
    const button = (
                      <div>
                        <button className="button-animal" onClick={this.onOpen}>
                          <i className="material-icons">mode_edit</i>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <EditAnimalModal onClose={this.onClose} />
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

const { string, object } = PropTypes;

EditAnimalButton.propTypes = {
  userPermission: string.isRequired,
  animal: object.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(EditAnimalButton);
