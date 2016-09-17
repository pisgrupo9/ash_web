import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import LoginBox from '../components/common/LoginBox';
import LogoHeader from '../components/common/LogoHeader';
import * as passwordActions from '../actions/passwordActions';
import * as StringV from '../util/StringValidate';
import UpdatePassForm from '../components/updatePass/UpdatePassForm';
import * as message from '../constants/apiMessage';
import '../styles/login.scss';

class UpdatePassPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };
    const { query } = this.props.location;
    this.reset_password_token = query.reset_password_token;
    this.form = {
      password: { value: '' },
      password_confirmation: { value: '' }
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.userForm) {
      this.setState({ loading: false });
    }
  }

  validateForm(form) {
    return this.validatePass(form) & this.validatePassConfirm(form);
  }

  onSubmit() {
    this.setState({ loading: true });
    let form = this.form;
    let valid = this.validateForm(form);
    if (valid) {
      let user = { user: {
                      reset_password_token: this.reset_password_token,
                      password: form.password.value,
                      password_confirmation: form.password_confirmation.value
                    }
                  };
      this.props.actions.updatePass(user, this.context.router);
    } else {
      this.setState({ loading: false });
    }
    return this.setState({ form });
  }

  validatePass(form) {
    form.password.error = null;
    if (form.password.value == '') {
      form.password.error = message.ERROR_REQUIRED_FIELD;
      return false;
    } else if (!StringV.isPass(form.password.value)) {
      form.password.error = message.ERROR_PASS_SHORT;
      return false;
    }
    return true;
  }

  validatePassConfirm(form) {
    form.password_confirmation.error = null;
    if (form.password_confirmation.value == '') {
      form.password_confirmation.error = message.ERROR_REQUIRED_FIELD;
      return false;
    } else if (form.password.value != form.password_confirmation.value) {
      form.password_confirmation.error = message.ERROR_PASS_NOT_EQUAL;
      return false;
    }
    return true;
  }

  validateField(form, field) {
    if (field == 'password') {
     this.validatePass(form);
    } else if (field == 'password_confirmation') {
     this.validatePassConfirm(form);
    }
  }

  onChange(e) {
    const field = e.target.name;
    let form = this.form;
    form[ field ].value = e.target.value;
    this.validateField(form, field);
    this.setState({ form });
  }

  render() {
    const title = 'Restablecer Password';
    let error = (this.props.userForm && this.props.userForm.errorPass ? this.props.userForm.errorPass : undefined);
    return (
      <LoginBox>
        <LogoHeader title={title}/>
        <UpdatePassForm form={this.form}
                    error={error}
                    onChange={this.onChange}
                    loading={this.state.loading}
                    onSubmit={this.onSubmit}/>
        <div className="link-wrapper">
          <Link to="login" className="form-link">
            Ingresar
          </Link>
        </div>
      </LoginBox>
    );
  }
}

const { object } = PropTypes;

UpdatePassPage.propTypes = {
  actions: object.isRequired,
  userForm: object,
  location: object.isRequired
};

UpdatePassPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ userForm: state.userForm });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(passwordActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(UpdatePassPage);

