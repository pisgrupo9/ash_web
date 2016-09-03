import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Col } from 'react-bootstrap';

const LoginForm = ({ form, error, onChange, onSummit }) => {
  return (
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Input label="Email" type="text" name="email" value={form.email.value}  onChange={onChange} error={form.email.error}/>
          <Input label="Password" type="password" name="pass" value={form.pass.value} onChange={onChange} error={form.pass.error}/>
          <Col lg={10} lgOffset={1}>
            <input type="button" className="btn summit bg-orange-color" value="Ingresar" onClick={onSummit}/>
          </Col>
          <p className="remLink"><a href="javascript:void()" className="dark-grey-color">Olvide mi Conreasenia</a></p>
        </div>
      </Col>
    </Row>
  );
};

const { string, func, object } = PropTypes;

LoginForm.propTypes = {
  form: object.isRequired,
  onChange: func.isRequired,
  onSummit: func.isRequired,
  error: string
};


export default LoginForm;
