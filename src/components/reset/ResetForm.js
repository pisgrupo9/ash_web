import React, { PropTypes } from 'react';
import Input from '../common/Input';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';

const ResetForm = ({ form, error, onChange, onSubmit, loading }) => {

  const submitButton = (<input type="button" className="btn submit-btn" value="Enviar Mail" onClick={onSubmit}/>);

  const loadingButton = (<div className="btn user-submit-btn bg-orange-color">
                         <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
  return (
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="user-form m-bot30">
          {error && <div className="alert alert-danger">{error}</div>}
          <Input styleClass="user-input"
                  label="Email"
                  type="text"
                  name="email"
                  value={form.email.value}
                  onChange={onChange}
                  error={form.email.error}/>
              { loading ? loadingButton : submitButton}
        </div>
      </Col>
    </Row>
  );
};

const { string, func, object, bool } = PropTypes;

ResetForm.propTypes = {
  form: object.isRequired,
  onChange: func.isRequired,
  onSubmit: func.isRequired,
  error: string,
  loading: bool.isRequired
};

export default ResetForm;
