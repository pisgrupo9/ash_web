import React, { Component, PropTypes } from 'react';
import AddAdopterModal from '../../containers/AddAdopterModal';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import * as util from '../../util/validateForm';
import '../../styles/adopter-list.scss';

class AddAdopterButton extends Component {
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
                      <div className="add-adopter-button">
                        <button className="button-animal" onClick={this.onOpen}>
                          <Icon className="add-button orange-color" name="plus-circle"/>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <AddAdopterModal onClose={this.onClose} />
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

AddAdopterButton.propTypes = {
  userPermission: string.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(AddAdopterButton);
