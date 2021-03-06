import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import LoginBox from '../components/common/LoginBox';
import LogoHeader from '../components/common/LogoHeader';
import * as loginActions from '../actions/loginActions';
import * as StringV from '../util/StringValidate';
import LoginForm from '../components/login/LoginForm';
import * as message from '../constants/apiMessage';
import '../styles/login.scss';

const title = 'Ingresar';
class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loading: false
    };

    this.form = {
      email: { value: '' },
      pass: { value: '' }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.login) {
      this.setState({ loading: false });
    }
  }

  onSubmit() {
    this.setState({ loading: true });
    let error = false;
    let form = this.form;
    delete form.email.error;
    delete form.pass.error;
    if (form.email.value == '') {
      form.email.error = message.ERROR_REQUIRED_FIELD;
      error = true;
    } else if (!StringV.isEmail(form.email.value)) {
      form.email.error = message.ERROR_EMAIL;
      error = true;
    }
    if (form.pass.value == '') {
      form.pass.error = message.ERROR_REQUIRED_FIELD;
      error = true;
    }
    if (!error) {
      let user = { user:
                    {
                        email: form.email.value,
                        password: form.pass.value
                    }
                  };
      this.props.actions.login(user, this.context.router);
    } else {
      this.setState({ loading: false });
    }
    return this.setState({ form });
  }

  onChange(e) {
    const field = e.target.name;
    let form = this.form;
    form[ field ].value = e.target.value;
    return this.setState({ form });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  render() {
    const login = this.props.login;
    let error = login ? login.errorLogin : null;
    return (
      <LoginBox>
        <LogoHeader title={title}/>
        <LoginForm form={this.form}
                    error={error}
                    onChange={this.onChange}
                    loading={this.state.loading}
                    onSubmit={this.onSubmit}
                    onKeyPress={this.onKeyPress}/>
        <div className="link-wrapper">
          <Link to="solicitud-registro" className="form-link">
            Crear Cuenta
          </Link>
        </div>
      </LoginBox>
    );
  }
}

const { object } = PropTypes;

LoginPage.propTypes = {
  actions: object.isRequired,
  login: object
};

LoginPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ login: state.login });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LoginPage);
