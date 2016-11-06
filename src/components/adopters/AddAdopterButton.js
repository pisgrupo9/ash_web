import React, { Component, PropTypes } from 'react';
import AddAdopterModal from '../../containers/modal/AddAdopterModal';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adopterActions from '../../actions/adopterActions';
import { Modal } from 'react-bootstrap';
import { Icon } from 'react-fa';
import ReactTooltip from 'react-tooltip';
import * as util from '../../util/validateForm';
import * as message from '../../constants/apiMessage';
import '../../styles/adopter-list.scss';

class AddAdopterButton extends Component {
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
    this.props.actions.cancelAdopterForm();
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
    let { userPermission } = this.props;
    let { showModal, backdrop } = this.state;
    let { onClose, onOpen, onToggleBackdrop } = this;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
      <div className="add-adopter-button">
        <button className="button-animal" data-tip data-for="add-adopter" onClick={onOpen}>
          <Icon className="add-button orange-color" name="plus-circle"/>
        </button>
        <ReactTooltip id="add-adopter" delayShow={500} place="left" type="warning" effect="solid">
          {message.TOOLTIP_ADD_ADOPTER}
        </ReactTooltip>
        <Modal show={showModal} backdrop={backdrop || 'static'} onHide={onClose} bsSize="large">
          <AddAdopterModal {...{ onClose, onToggleBackdrop }} />
        </Modal>
      </div>
    );

    return (
      <div>
        { showButton && button }
      </div>
    );
  }
}

const { string, object } = PropTypes;

AddAdopterButton.propTypes = {
  actions: object.isRequired,
  userPermission: string.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || ''
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddAdopterButton);
