import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adopterActions from '../../actions/adopterActions';
import * as valid from '../../util/validateForm';
import { toastr } from 'react-redux-toastr';
import * as messages from '../../constants/apiMessage';
import AdopterFormEdit from '../../components/adopters/perfil/AdopterFormEdit';
import Spinner from 'react-spinkit';
import '../../styles/animal-form.scss';
import _ from 'lodash';

class EditAdopterModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      adopter: {
        ci: '',
        fullName: '',
        email: '',
        phone: '',
        homeAddress: '',
        houseDescription: ''
      },
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        homeAddress: '',
        houseDescription: ''
      },
      requiredFields: {
        fullName: true,
        email: false,
        phone: true,
        homeAddress: true,
        houseDescription: false
      },
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    const { adopter } = this.props;
    let adopterEdit = {};
    for (let name in adopter) {
      adopterEdit[_.camelCase(name)] = adopter[name];
    }
    adopterEdit.fullName = `${adopter.first_name} ${adopter.last_name}`;
    this.setState({ adopter: adopterEdit, loading: false });
  }

  componentWillReceiveProps(nextProps) {
    const { loading, success, onToggleBackdrop } = this.props;
    onToggleBackdrop();
    if (nextProps.success != success) {
      toastr.success('', messages.SUCCESS_UPDATE_ADOPTER);
      loading();
      this.props.onClose();
    } else {
      this.setState({ loading: false });
    }
  }

  componentWillUnmount() {
    this.props.actions.cancelAdopterForm();
  }

  validateForm(adopter) {
    let { errors, requiredFields } = this.state;
    for (let name in adopter) {
      if (requiredFields[name]) {
        if (name === 'fullName') {
          errors.firstName = valid.validateEmptyField(adopter.fullName);
        } else {
          errors[name] = valid.validateEmptyField(adopter[name]);
        }
      }
    }
    if (!errors.firstName && !errors.lastName) {
      errors.firstName = valid.validateFullName(adopter.fullName);
    }
    if (!errors.phone) {
      errors.phone = valid.validatePhone(adopter.phone);
    }
    errors.email = adopter.email ? valid.validateEmail(adopter.email) : '';
    this.setState({ errors });
  }

  onSubmit() {
    const { adopter, adopterId, onToggleBackdrop } = this.props;
    const myAdoter = this.state.adopter;
    this.validateForm(this.state.adopter);
    if (valid.notErrors(this.state.errors)) {
      onToggleBackdrop();
      let editAnimal = {};
      for (let name in myAdoter) {
        if (myAdoter[name] !== adopter[_.snakeCase(name)]) {
          editAnimal[name] = myAdoter[name];
        }
      }
      this.props.actions.editAdopterForm(adopterId, editAnimal);
      this.setState({ loading: true });
    }
  }

  onChange(e) {
    let { name, value } = e.target;
    let { adopter, errors } = this.state;
    adopter[ name ] = value;
    this.setState({ adopter });
    if (this.state.requiredFields[ name ]) {
      if (name === 'fullName') {
        errors.firstName = valid.validateEmptyField(value);
      } else {
        errors[name] = valid.validateEmptyField(value);
      }
      this.setState({ errors: errors });
    }
  }

  render() {
    let { adopter, errors, loading } = this.state;
    const localErrors = !valid.notErrors(errors);
    const loadingView = (
      <div className="loading-container">
        <Spinner spinnerName="three-bounce" noFadeIn />
      </div>);
    const body = (
        <AdopterFormEdit adopter={adopter}
                          onSave={this.onSubmit}
                          onChange={this.onChange}
                          onCancel={this.props.onClose}
                          errors={localErrors ? errors : this.props.errors}/>
    );
    const getView = () => {
      if (loading) {
        return loadingView;
      } else {
        return body;
      }
    };
    return (
      <div id="modal" className="animal-form-wrapper">
        <h2 className="animal-form-title"> EDITAR DE ADOPTANTE </h2>
        {getView()}
      </div>
    );
  }
}

const { object, func, bool, string } = PropTypes;

EditAdopterModal.propTypes = {
  adopter: object.isRequired,
  adopterId: string.isRequired,
  loading: func.isRequired,
  errors: object.isRequired,
  success: bool.isRequired,
  onClose: func.isRequired,
  onToggleBackdrop: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  const errors = {};
  let { adopterForm } = state;
  for (let error in adopterForm.errors) {
    errors[error] = _.first(adopterForm.errors[error]);
  }

  return {
    errors: errors,
    success: state.adopterForm.success
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAdopterModal);
