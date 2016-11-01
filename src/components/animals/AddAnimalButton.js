import React, { Component, PropTypes } from 'react';
import NewAnimalModal from '../../containers/modal/NewAnimalModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import * as util from '../../util/validateForm';

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
    let { userPermission } = this.props;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
                      <div>
                        <button className="button-animal" onClick={this.onOpen}>
                          <Icon className="add-button orange-color" name="plus-circle"/>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <NewAnimalModal onClose={this.onClose} />
                        </Modal>
                      </div>
                    );

    return (
      <div className="float-right">
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
