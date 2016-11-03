import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import EditAdopterModal from '../../../containers/modal/EditAdopterModal';
import * as util from '../../../util/validateForm';

class EditAdopterButton extends Component {
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
    const { loading, adopter, adopterId, userPermission } = this.props;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
                      <div>
                        <button className="btn-rec adopter bg-orange-color" onClick={this.onOpen}>
                          <i className="material-icons color">mode_edit</i>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <EditAdopterModal
                            loading={loading}
                            onClose={this.onClose}
                            adopter={adopter}
                            adopterId={adopterId}/>
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
