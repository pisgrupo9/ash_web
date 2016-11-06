import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import EditAnimalModal from '../../../containers/modal/EditAnimalModal';
import * as animalActions from '../../../actions/animalActions';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';

class EditAnimalButton extends Component {
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
    this.props.actions.cancelAnimalForm();
    this.setState({ showModal: false });
  }

  onOpen() {
    this.setState({ showModal: true, backdrop: true });
  }

  onToggleBackdrop() {
    const { backdrop } = this.state;
    this.setState({ backdrop: !backdrop });
  }

  render() {
    const { loading, animal, routeId, userPermission } = this.props;
    const { showModal, backdrop } = this.state;
    const { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <button type="button"
              className="btn btn-edit bg-orange-color"
              data-tip data-for="edit-animal"
              onClick={onOpen}>
        <i className="material-icons edit">mode_edit</i>
      </button>
    );

    return (
      <span>
        { showButton && button }
        <ReactTooltip id="edit-animal" delayShow={500} place="top" type="warning" effect="solid">
          {message.TOOLTIP_EDIT_ANIMAL}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <EditAnimalModal {...{ loading, onClose, onToggleBackdrop, animal, routeId }} />
        </Modal>
      </span>
    );
  }
}

const { string, object, func } = PropTypes;

EditAnimalButton.propTypes = {
  userPermission: string.isRequired,
  animal: object.isRequired,
  routeId: string.isRequired,
  loading: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAnimalButton);
