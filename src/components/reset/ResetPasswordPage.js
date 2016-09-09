import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as passwordActions from '../../actions/passwordActions';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import ResetForm from './ResetForm';
import * as StringV from '../../util/StringValidate';
import * as message from '../../constants/apiMessage';
import '../../styles/reset-password.scss';

class ResetPasswordPage extends Component {
  constructor(props, context) {
    super(props, context);
  
    this.state = {
      loading: false,
      form: {
        email: { value: '' }
      }
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resetPass) {
      this.setState( { loading: false } );
    }
  }

  onSubmit() {
    this.setState({ loading: true});
    let form = this.state.form;
    form.email.error = '';
    if (form.email.value == '') {
      form.email.error = message.ERROR_REQUIRED_FIELD;
    } else if (!StringV.isEmail(form.email.value)) {
      form.email.error = message.ERROR_EMAIL;
    }
    if (!form.email.error) {
      let email = form.email.value;
      this.props.actions.sendPasswordRequest(email, this.context.router);
    } else { this.setState({ loading: false }); }
  }

  onChange(e) {
    const field = e.target.name;
    let form = this.state.form;
    form[ field ].value = e.target.value;
    return this.setState({ form });
  }

  render() {
    let resetPass = this.props.resetPass;
    let title = 'Restablecer Contraseña';
    let error = resetPass ? resetPass.errors : null;
    return (

      <LoginBox>
        <LogoHeader title={title} error={error} />
        <p className="reset-password-info">Si desea restablecer su contraseña, ingrese su mail.</p>
        <ResetForm form={this.state.form}
                    error={error} 
                    onChange={this.onChange} 
                    onSubmit={this.onSubmit}
                    loading={this.state.loading}/>
      </LoginBox>
    );
  }
}

const { object } = PropTypes;

ResetPasswordPage.propTypes = {
  resetPass: object.isRequired,
  actions: object.isRequired
 };

ResetPasswordPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ resetPass: state.resetPass });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(passwordActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(ResetPasswordPage);
