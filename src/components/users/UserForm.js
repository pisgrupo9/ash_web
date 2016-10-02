import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import Spinner from 'react-spinkit';
import Input from '../common/Input';
import '../../styles/login.scss';

const UserForm = ({ user, loading, onSave, onChange, onBlur, onKeyPress, errors }) => {
  const submitButton = (<input className="btn user-submit-btn"
                                type="submit"
                                value="ENVIAR"
                                onClick={onSave} />);

  const loadingButton = (<div className="btn user-submit-btn">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                         </div>);

  return (
    <Row>
      <Col lg={8} lgOffset={2} md={10} mdOffset={1} sm={10} smOffset={1} xs={12}>
        <div className="user-form">
          <Input styleClass="user-input"
                  name="name"
                  label="Nombre y apellido"
                  type="text"
                  value={user.nameValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.name} />
          <Input styleClass="user-input"
                  name="email"
                  label="Correo electronico"
                  type="email"
                  value={user.emailValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.email} />
          <Input styleClass="user-input"
                  name="phone"
                  label="Telefono"
                  type="number"
                  value={user.phoneValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.phone} />
          <Input styleClass="user-input"
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={user.passwordValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  error={errors.password} />
          <Input styleClass="user-input"
                  name="password_confirmation"
                  label="Repetir Contraseña"
                  type="password"
                  value={user.confirmedPasswordValue}
                  onChange={onChange}
                  onBlur={onBlur}
                  onKeyPress={onKeyPress}
                  error={errors.password_confirmation} />
          { loading ? loadingButton : submitButton}
        </div>
      </Col>
    </Row>
  );
};

const { object, func, bool } = PropTypes;

UserForm.propTypes = {
  user: object.isRequired,
  loading: bool.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onBlur: func.isRequired,
  onKeyPress: func.isRequired,
  errors: object
};

export default UserForm;
