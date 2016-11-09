import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as animalActions from '../../actions/animalActions';
import { toastr } from 'react-redux-toastr';
import * as messages from '../../constants/apiMessage';
import Spinner from 'react-spinkit';

class DeleteAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success ) {
      this.props.onClose();
      toastr.info('', messages.DELETE_ANIMAL_SUCCESS);
      browserHistory.push('/');
    } else if (nextProps.error) {
      this.props.onToggleBackdrop();
      this.setState({ loading: false });
      toastr.error('', messages.DELETE_ANIMAL_ERROR);
    }
  }

  onSubmit() {
    this.setState({ loading: true });
    const { animalId, actions, onToggleBackdrop } = this.props;
    onToggleBackdrop();
    actions.deleteAnimal(animalId);
  }

  render() {
    let { loading } = this.state;
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const body = (
      <div className="confirm-modal">
        <h1 className="confirm-title">
          {messages.DELETE_ANIMAL_TITLE}
        </h1>
        <div className="confirm-message dark-grey-color">
          {messages.DELETE_ANIMAL_MESSAGE}
        </div>
        <div className="center-buttons">
          <button onClick={this.onSubmit} className="btn">
            ELIMINAR
          </button>
          <button onClick={this.props.onClose} className="btn cancel-button">
            CANCELAR
          </button>
        </div>
      </div>
    );

    return (
      <div id="modal">
        { loading ? loadingView : body }
      </div>
    );
  }
}

const { object, func, bool, string } = PropTypes;

DeleteAnimalModal.propTypes = {
  error: string.isRequired,
  success: bool.isRequired,
  animalId: string.isRequired,
  onClose: func.isRequired,
  onToggleBackdrop: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  return {
    success: state.animalForm.deleteSuccess,
    error: state.animalForm.deleteError
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(DeleteAnimalModal);
