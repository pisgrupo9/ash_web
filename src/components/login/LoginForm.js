import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Col, Row } from 'react-bootstrap';

const LoginForm = ({ form, error, onChange, onSubmit }) => {
  return (
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="user-form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Input styleClass="user-input"
                  label="Email"
                  type="text"
                  name="email"
                  value={form.email.value}
                  onChange={onChange}
                  error={form.email.error}/>
          <Input styleClass="user-input"
                  label="Password"
                  type="password"
                  name="pass"
                  value={form.pass.value}
                  onChange={onChange}
                  error={form.pass.error}/>
          <Row>
            <Col lg={10} lgOffset={1}>
              <input type="button" className="btn user-submit-btn bg-orange-color" value="Ingresar" onClick={onSubmit}/>
            </Col>
          </Row>
          <p className="remLink"><a href="javascript:void()" className="dark-grey-color">Olvide mi Contraseña</a></p>
        </div>
      </Col>
    </Row>
  );
};

const { string, func, object } = PropTypes;

LoginForm.propTypes = {
  form: object.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  error: string
};

export default LoginForm;
