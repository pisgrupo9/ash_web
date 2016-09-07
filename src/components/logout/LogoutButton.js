import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';

const LogoutButton = ({ onClickLogout }) => {
  return(
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="span7 text-center">
          <input 
            type="button" 
            className="btn user-submit-btn bg-orange-color" 
            value="SALIR" 
            onClick={onClickLogout}/>
        </div>
      </Col>
    </Row>
  );
};

const { func } = PropTypes;

LogoutButton.propTypes = {
  onClickLogout: func.isRequired
};

export default LogoutButton;
