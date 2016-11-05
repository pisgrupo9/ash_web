import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as adopterActions from '../../actions/adopterActions';
import * as valid from '../../util/validateForm';
import { toastr } from 'react-redux-toastr';
import * as messages from '../../constants/apiMessage';
import AdopterForm from '../../components/adopters/AdopterForm';
import '../../styles/animal-form.scss';
import _ from 'lodash';
import Spinner from 'react-spinkit';
import * as consts from '../../constants/apiConstants';

class AddAdopterModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      adopter: {
        fullName: '',
        ci: '',
        email: '',
        phone: '',
        homeAddress: '',
        houseDescription: '',
        blacklisted: false
      },
      errors: {
        firstName: '',
        lastName: '',
        ci: '',
        email: '',
        phone: '',
        homeAddress: '',
        houseDescription: '',
        blacklisted: ''
      },
      requiredFields: {
        fullName: true,
        ci: true,
        email: false,
        phone: true,
        homeAddress: true,
        houseDescription: false
      },
      loading: false
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      let { filterParam } = this.props;
      this.props.actions.loadAdopters(consts.ADOPTER_PAGE_SIZE, 1, filterParam);
      toastr.success('', messages.SUCCESS_CREATE_ADOPTER);
      this.onClose();
    } else {
      this.setState({ loading: false });
    }
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
    if (!errors.ci) {
      errors.ci = valid.validateCi(adopter.ci);
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

  onSubmit(e) {
    e.preventDefault();
    this.validateForm(this.state.adopter);
    if (valid.notErrors(this.state.errors)) {
      this.setState({ loading: true });
      this.props.actions.sendAdopterForm(this.state.adopter);
    }
  }

  onChange(e) {
    let { name, value, checked } = e.target;
    let { adopter, errors } = this.state;
    value = name === 'blacklisted' ? checked : value;
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

  onClose() {
    this.props.actions.cancelAdopterForm();
    this.props.onClose();
  }

  render() {
    let { adopter, errors, loading } = this.state;
    const localErrors = !valid.notErrors(errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> INGRESO DE ADOPTANTE </h2>
                    <AdopterForm adopter={adopter}
                                  onSave={this.onSubmit}
                                  onChange={this.onChange}
                                  onCancel={this.onClose}
                                  errors={localErrors ? errors : this.props.errors}
                                  />
                  </div>);

    return (
      <div id="modal">
        { loading ? loadingView : body }
      </div>
    );
  }
}

const { object, func, bool } = PropTypes;

AddAdopterModal.propTypes = {
  errors: object.isRequired,
  success: bool.isRequired,
  filterParam: object.isRequired,
  onClose: func.isRequired,
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
    success: state.adopterForm.success,
    filterParam: state.adopters.filterParam
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(adopterActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddAdopterModal);
