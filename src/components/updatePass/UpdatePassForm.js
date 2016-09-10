import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';

const UpdatePassForm = ({ form, error, onChange, loading, onSubmit }) => {
  const submitButton = (<input type="button" className="btn user-submit-btn bg-orange-color" value="CONFIRMAR" onClick={onSubmit}/>);

  const loadingButton = (<div className="btn user-submit-btn bg-orange-color">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                         </div>);

  return (
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="user-form">
          {error && <div className="alert alert-danger">{error}</div>}
          <Input styleClass="user-input"
                  label="Contraseña"
                  type="password"
                  name="password"
                  value={form.password.value}
                  onChange={onChange}
                  error={form.password.error}/>
          <Input styleClass="user-input"
                  label="Confirmar contraseña"
                  type="password"
                  name="password_confirmation"
                  value={form.password_confirmation.value}
                  onChange={onChange}
                  error={form.password_confirmation.error}/>
          { loading ? loadingButton : submitButton}
        </div>
      </Col>
    </Row>
  );
};

const { string, func, object, bool } = PropTypes;

UpdatePassForm.propTypes = {
  form: object.isRequired,
  onChange: func.isRequired,
  loading: bool.isRequired,
  onSubmit: func.isRequired,
  error: string
};

export default UpdatePassForm;
