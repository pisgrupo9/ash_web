import React, { Component, PropTypes } from 'react';
import { Col } from 'react-bootstrap';

const { array } = PropTypes;

class LoginBox extends Component {
  render() {
    return (
      <Col lg={4} lgOffset={4} md={6} mdOffset={3} sm={12} xs={12}>
        <div className="login-box">
          {this.props.children}
        </div>
      </Col>
    );
  }
}

LoginBox.propTypes = {
  children: array.isRequired
};

export default LoginBox;
