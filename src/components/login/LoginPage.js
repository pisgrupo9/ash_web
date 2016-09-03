import React, { Component,PropTypes } from 'react';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as loginActions from '../../actions/loginActions';
import * as StringV from '../../util/StringValidate';
import LoginForm from './LoginForm';
import * as message from '../../constants/apiMessage';
import '../../styles/login.scss';

const title ='Ingresar';
class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.form ={
          email:{ value:''},
          pass:{ value:''}
        };
    this.onSummit = this.onSummit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

 onSummit(){
    let error = false;
    let form = this.form;
    delete form.email.error;
    delete form.pass.error;
    if(form.email.value == '' ){
      form.email.error = message.ERROR_CAMPO_REQUERIDO;
      error =true;
    }
    if(!StringV.isEmail(form.email.value)){
      form.email.error = message.ERROR_EMAIL;
      error =true;
    }
    if(form.pass.value == ''){
      form.pass.error = message.ERROR_CAMPO_REQUERIDO;
      error =true;
    }
    if(!error){
      let user = {
                  user:{
                        email : form.email.value,
                        password : form.pass.value
                      }
                  };
      this.props.dispatch(loginActions.login(user));
    }
    return this.setState({form });
  }

  onChange(e) {
    const field = e.target.name;
    let form = this.form;
    form[ field ].value = e.target.value;
    return this.setState({ form });
  }
  render() {
    const login = this.props.login;
    let error = login ? login.errorMessag : null;
    return (
      <LoginBox>
        <LogoHeader title={title}/>
        <LoginForm form={this.form} error={error} onChange={this.onChange} onSummit={this.onSummit}/>
        <Link to="register" className="btn orange-color">Crear Cuenta</Link>
      </LoginBox>
    );
  }
}

const { func,object } = PropTypes;
LoginPage.propTypes = {
  dispatch: func.isRequired,
  login : object
};

const mapState = (state) => ({ login: state.login});

export default connect(mapState)(LoginPage);

