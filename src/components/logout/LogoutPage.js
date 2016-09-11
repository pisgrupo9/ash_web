import React, { Component, PropTypes } from 'react';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../../actions/logoutActions';
import LogoutButton from './LogoutButton';
import Header from '../common/Header';

class LogoutPage extends Component {
  constructor(props, context){
    super(props, context);
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  
  onClickLogout(){
    this.props.actions.logoutDispatch(this.context.router);
  }

  render (){
    const title = 'Desea salir?';
    return(
      <div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
        <Header location={this.props.location}/>
>>>>>>> 96760ec... Crear Header Y pagenas para navegar
=======
        <Header location={this.props.location} user={this.props.user}/>
>>>>>>> c46bfc9... Coneccion con show user
        <LoginBox> 
          <div>
            <LogoHeader title={title}/>
            <LogoutButton onClickLogout={this.onClickLogout}/>
          </div>
        </LoginBox>
      </div>
    );
  }
}

const { object } = PropTypes;

LogoutPage.propTypes = {
<<<<<<< HEAD
  actions : object.isRequired
=======
  actions : object.isRequired,
<<<<<<< HEAD
  location : object.isRequired
>>>>>>> 96760ec... Crear Header Y pagenas para navegar
=======
  location : object.isRequired,
  user : object.isRequired
>>>>>>> c46bfc9... Coneccion con show user
};

LogoutPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ user: state.user });

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(logoutActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LogoutPage);
