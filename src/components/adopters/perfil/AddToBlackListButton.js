import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr';
import * as util from '../../../util/validateForm';
import * as message from '../../../constants/apiMessage';
import * as adopterActions from '../../../actions/adopterActions';
import * as confirmActions from '../../../actions/confirmActions';

class AddToBlackListButton extends Component {
  constructor(props, context) {
    super(props, context);

    this.addToBlackList = this.addToBlackList.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.adopter.blackListSuccess ) {
      const { loading } = this.props;
      toastr.info('', message.ADD_BLACK_LIST_SUCCES);
      loading();
    }
  }

  addToBlackList() {
    const { adopterId, adopter } = this.props;

    const confirmf = () => {
      this.props.adopterActions.addToBlackList(adopterId);
    };

    this.props.confirmActions.confirmDialog({
      title: message.ADD_BLACK_LIST_TITLE,
      message: message.ADD_BLACK_LIST_MESSAGE(adopter.animals.length),
      confirmF: confirmf,
      styleClass: 'black-list',
      size: 'large',
      confirmLabel: 'AGREGAR'
    });
  }

  render() {
    const { userPermission } = this.props;
    const showButton = util.editAdopterPerfil(userPermission);
    const button = (
      <button className="btn-rec blacklisted bg-orange-color" onClick={this.addToBlackList}>
         <i className="material-icons color">not_interested</i>
      </button>
    );

    return (
      <div className="btn-edit-adopter">
        { showButton ? button : '' }
      </div>
    );
  }
}

const { string, object, func } = PropTypes;

AddToBlackListButton.propTypes = {
  userPermission: string.isRequired,
  adopterId: string.isRequired,
  adopter: object.isRequired,
  loading: func.isRequired,
  adopterActions: object.isRequired,
  confirmActions: object.isRequired
};

const mapState = (state) => {
  return {
    userPermission: state.user.permissions || '',
    adopter: state.adopter
  };
};

const mapDispatch = (dispatch) => {
  return {
    adopterActions: bindActionCreators(adopterActions, dispatch),
    confirmActions: bindActionCreators(confirmActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddToBlackListButton);
