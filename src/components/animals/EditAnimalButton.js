import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import EditAnimalModal from '../../containers/EditAnimalModal';
import * as util from '../../util/validateForm';

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
    const showButton = util.editAnimalPerfil(this.props.userPermission);
    const button = (
                      <div>
                        <button type="button" className="btn-circle" onClick={this.onOpen}>
                          <i className="material-icons color">mode_edit</i>
                        </button>
                        <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
                          <EditAnimalModal loading={this.props.loading} onClose={this.onClose} animal={this.props.animal} route_id={this.props.route_id}/>
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

EditAnimalButton.propTypes = {
  userPermission: string.isRequired,
  animal: object.isRequired,
  route_id: string.isRequired,
  loading: func.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

export default connect(mapState)(EditAnimalButton);
