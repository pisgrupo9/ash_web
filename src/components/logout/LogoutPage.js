import React, { Component, PropTypes } from 'react';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../../actions/logoutActions';
import LogoutButton from './LogoutButton';

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
  actions : object.isRequired
};

LogoutPage.contextTypes = {
  router: object
};

const mapState = () => ({});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(logoutActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(LogoutPage);
