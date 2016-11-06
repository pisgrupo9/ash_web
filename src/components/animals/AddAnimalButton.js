import React, { Component, PropTypes } from 'react';
import NewAnimalModal from '../../containers/modal/NewAnimalModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import * as animalActions from '../../actions/animalActions';
import * as util from '../../util/validateForm';
import * as message from '../../constants/apiMessage';

class AddAnimalButton extends Component {
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
    this.setState({ showModal: true });
  }

  onToggleBackdrop() {
    const { backdrop } = this.state;
    this.setState({ backdrop: !backdrop });
  }

  render() {
    let { userPermission } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAnimalPerfil(userPermission);
    const button = (
      <div>
        <button className="button-animal" data-tip data-for="add-animal" onClick={onOpen}>
          <Icon className="add-button orange-color" name="plus-circle"/>
        </button>
        <ReactTooltip id="add-animal" delayShow={500} place="left" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ANIMAL}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <NewAnimalModal {...{ onClose, onToggleBackdrop }} />
        </Modal>
      </div>
    );

    return (
      <div className="float-right">
        { showButton && button }
      </div>
    );
  }
}

const { string, object } = PropTypes;

AddAnimalButton.propTypes = {
  userPermission: string.isRequired,
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

export default connect(mapState, mapDispatch)(AddAnimalButton);
