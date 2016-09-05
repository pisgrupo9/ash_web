import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import * as userActions from '../../actions/userActions';
import UserForm from './UserForm';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import * as checkEmail from '../../util/StringValidate';

class CreateUserPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        password: '',
        password_confirmation: ''
      },
      form: { valid: false },
      loading: false
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.submitUserForm = this.submitUserForm.bind(this);
    this.updateValidField = this.updateValidField.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ loading: false });
    }
  }

  validateNames(name) {
    let errors = this.state.errors;
    const firstLastName = name.split(' ');
    const valid = firstLastName[0] && firstLastName[1];
    errors.name = valid ? '' : 'Ingrese nombre y apellido';
    this.setState({ errors });
  }

  validateEmail(email) {
    let errors = this.state.errors;
    errors.email = checkEmail.isEmail(email) ? '' : 'Correo electronico invalido';
    this.setState({ errors });
  }

  validateEmptyField(fieldVaule, fieldName){
    let errors = this.state.errors;
    errors[fieldName] = fieldVaule ? '' : 'Campo Obligatorio';
    this.setState({ errors });
  }

  validatePassword(pass, passConfirmation) {
    let errors = this.state.errors;
    errors.password_confirmation = pass === passConfirmation ? '' : 'Las contraseñas no coinciden';
    if(pass.length < 8) {
      errors.password = 'contraseña muy corta(minimo 8 caracteres)';
    }
    this.setState({ errors });
  }

  validateForm() {
    let user = this.state.user;
    for(let input in user) {
      let field = {
        value: user[input],
        name: input
      };
      this.validateField(field);
    }
    if(user.password) {
      this.validatePassword(user.password, user.password_confirmation);
    }

    let errors = this.state.errors;
    let form = this.state.form;
    form.valid = true;
    for(let i in errors) {
      form.valid = form.valid && !errors[i];
    }
    this.setState({ form });
  }

  validateField(field) {
    this.validateEmptyField(field.value, field.name);
    if(field.name === 'name') {
      this.validateNames(field.value);
    } else if (field.name === 'email') {
      this.validateEmail(field.value);
    }
  }

  updateValidField(e) {
    this.validateField(e.target);
  }

  updateUserState(e) {
    const field = e.target.name;
    let user = this.state.user;
    user[ field ] = e.target.value;
    return this.setState({ user });
  }

  submitUserForm(e) {
    e.preventDefault();
    this.setState({ loading: true });
    this.validateForm();
    if(this.state.form.valid) {
      let dataUser = Object.assign({}, this.state.user);
      if(dataUser.name) {
        const firstLastName = dataUser.name.split(' ');
        dataUser.first_name = firstLastName[0];
        dataUser.last_name = firstLastName[1];
      }
      delete dataUser.name;
      const user = { 'user': dataUser };
      this.props.actions.sendUserForm(user, this.context.router);
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    const erorsFromServer = this.state.form.valid && Object.keys(this.props.errors).length !== 0;
    return (
      <LoginBox>
        <LogoHeader title="Solicitud Registro" />
        <UserForm user={this.state.user}
                  loading={this.state.loading}
                  onSave={this.submitUserForm}
                  onChange={this.updateUserState}
                  onBlur={this.updateValidField}
                  errors={erorsFromServer ? this.props.errors : this.state.errors} />
        <div className="link-wrapper">
          <Link to="login" className="form-link">Ingresar</Link>
        </div>
      </LoginBox>
    );
  }
}

const { object } = PropTypes;

CreateUserPage.propTypes = {
  errors: object.isRequired,
  actions: object.isRequired
};

CreateUserPage.contextTypes = {
  router: object
};

const mapState = (state) => {
  const errors = {};
  for(let error in state.userForm.error) {
    errors[error] = state.userForm.error[error][0];
  }

  return {
    errors: errors
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(CreateUserPage);
