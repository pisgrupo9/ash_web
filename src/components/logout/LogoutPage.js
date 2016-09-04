import React, { Component,PropTypes } from 'react';
import LoginBox from '../common/LoginBox';
import LogoHeader from '../common/LogoHeader';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../../actions/logoutActions';
import { Col, Row } from 'react-bootstrap';

const title = 'Desea salir?';


class LogoutPage extends Component {
  constructor(props, context){
    super(props, context);
    this.onClickLogout = this.onClickLogout.bind(this);
  }
  onClickLogout (){
    this.props.actions.logoutDispatch(this.context.router);
  }

  render (){
    return(
      <LoginBox>       
        <LogoHeader title={title}/>
        <div>
        <Row>
          <Col lg={40} lgOffset={5}>
            <input 
            type="button" 
            className="btn user-submit-btn bg-orange-color" 
            value="salir"
            onClick={this.onClickLogout} />
          </Col>
        </Row>
        </div>
      </LoginBox>
    );
  }
}

const { object } = PropTypes;

LogoutPage.propTypes = {
  actions: object.isRequired
};

LogoutPage.contextTypes = {
  router: object
};

const mapState = (state) => ({ login: state.login});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(logoutActions, dispatch)
  };
};
export default connect(mapState, mapDispatch)(LogoutPage);