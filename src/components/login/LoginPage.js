import React, { Component,PropTypes } from 'react';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as loginActions from '../../actions/loginActions';
import LoginForm from './LoginForm';
import '../../styles/login.scss';

const title ='Ingresar';
class LoginPage extends Component {

  constructor(props, context) {
    super(props, context);
    this.form ={
          email:{
            value:''
          },
          pass:{
            value:''
          }
        };
    this.onSummit = this.onSummit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
 onSummit(){
    let error = false;
    let form = this.form;
    form.email.error = null;
    form.pass.error = null;
    if(form.email.value == '' ){
      form.email.error = 'Campo Necesario';
      error =true;
    }
    if(form.pass.value == ''){
      form.pass.error = 'Campo Necesario';
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
        <br/>
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

