import React, { Component, PropTypes } from 'react';
import NewAnimalModal from '../../containers/NewAnimalModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';

class AddAnimalButton extends Component {
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
    const button =  (
                      <div>
                        <button className="button-animal" onClick={this.onOpen}>
                          <Icon className="add-button orange-color" name="plus-circle"/>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} >
                          <NewAnimalModal onClose={this.onClose} />
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

AddAnimalButton.propTypes = {
  userPermission: string.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(AddAnimalButton);
