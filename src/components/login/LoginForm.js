import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Link } from 'react-router';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';

const LoginForm = ({ form, error, onChange, loading, onSubmit, onKeyPress }) => {
  const submitButton = (<input type="button" className="btn submit-btn" value="INGRESAR" onClick={onSubmit}/>);

  const loadingButton = (<div className="btn submit-btn">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                         </div>);

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
                  onKeyPress={onKeyPress}
                  error={form.email.error}/>
          <Input styleClass="user-input"
                  label="Contraseña"
                  type="password"
                  name="pass"
                  value={form.pass.value}
                  onChange={onChange}
                  onKeyPress={onKeyPress}
                  error={form.pass.error}/>
          { loading ? loadingButton : submitButton}
          <p className="remLink"><Link to="reset" className="dark-grey-color">Olvide mi Contraseña</Link></p>
        </div>
      </Col>
    </Row>
  );
};

const { string, func, object, bool } = PropTypes;

LoginForm.propTypes = {
  form: object.isRequired,
  onChange: func.isRequired,
  loading: bool.isRequired,
  onSubmit: func.isRequired,
  onKeyPress: func,
  error: string
};

export default LoginForm;
