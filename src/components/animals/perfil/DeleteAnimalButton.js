import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import DeleteAnimalModal from '../../../containers/modal/DeleteAnimalModal';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';
import * as animalActions from '../../../actions/animalActions';
import * as confirmActions from '../../../actions/confirmActions';

class DeleteAnimalButton extends Component {
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
    const { animalId, userPermission } = this.props;
    const { onOpen, onClose } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <button
        className="btn btn-delete bg-orange-color"
        data-tip data-for="delete-animal"
        onClick={onOpen}>
         <i className="material-icons color">clear</i>
      </button>
    );

    return (
      <span className="delete-button-wrapper">
        { showButton && button }
        <ReactTooltip id="delete-animal" delayShow={500} place="top" type="warning" effect="solid">
            {message.TOOLTIP_ELIMINAR_ANIMAL}
        </ReactTooltip>
        <Modal show={this.state.showModal} onHide={onClose} bsSize="large">
          <DeleteAnimalModal {...{ onClose, animalId }} />
        </Modal>
      </span>
    );
  }
}

const { string, object } = PropTypes;

DeleteAnimalButton.propTypes = {
  userPermission: string.isRequired,
  animalId: string.isRequired,
  actions: object.isRequired,
  confirmActions: object.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || '',
    success: state.animalForm.deleteSuccess,
    error: state.animalForm.deleteError
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch),
    confirmActions: bindActionCreators(confirmActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(DeleteAnimalButton);
