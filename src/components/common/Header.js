import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Navbar, Image } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as logoutActions from '../../actions/logoutActions';
import * as userActions from '../../actions/userActions';
import '../../styles/header.scss';

class Header extends Component {

  constructor(props, context){
    super(props, context);
    this.onClickLogout = this.onClickLogout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.user.first_name){
      this.props.userActions.showLoginUser();
    }
  }
  
  onClickLogout(){
    this.props.logoutActions.logoutDispatch(this.context.router);
  }

  render (){
    const location = this.props.location;
    return  ( 
      <Navbar className ="bg-orange-color">
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/" className="imageheader">
               <Image src="https://s3-sa-east-1.amazonaws.com/ash-assets/ASH-white.png"/>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse className="nav-Options">
          <ul className={(location.includes('/animales') ? 'select ' : '' ) + 'nav navbar-nav item'}>
            <Link to="/animales">ANIMALES</Link>
          </ul>
          <ul className={(location.includes('/adoptantes') ? 'select ' :'' )+ 'nav navbar-nav item'}>
            <Link to="/adoptantes">ADOPTANTES</Link>
          </ul>
          <ul className={(location.includes('/estadisticas') ? 'select ' : '') + 'nav navbar-nav'}>
            <Link to="/estadisticas">ESTADISTICAS</Link>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <Link to="/perfil">Hola {this.props.user.first_name}</Link>
            &nbsp;|&nbsp;
            <a href="#" onClick={this.onClickLogout}>SALIR</a>
          </ul>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const { object,string } = PropTypes;

Header.propTypes = {
  logoutActions : object.isRequired,
  userActions : object.isRequired,
  location : string.isRequired,
  user : object.isRequired
};

Header.contextTypes = {
  router: object
};

const mapState = () => ({});

const mapDispatch = (dispatch) => {
  return {
    logoutActions: bindActionCreators(logoutActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(Header);
