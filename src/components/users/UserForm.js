import React, { PropTypes } from 'react';
import { Col, Row } from 'react-bootstrap';
import Input from '../common/Input';
import '../../styles/login.scss';

const UserForm = ({ user, onSave, onChange, errors}) => {
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
                  error={errors.name} />
          <Input styleClass="user-input"
                  name="email"
                  label="Correo electronico"
                  type="email"
                  value={user.emailValue}
                  onChange={onChange}
                  error={errors.email} />
          <Input styleClass="user-input"
                  name="phone"
                  label="Telefono"
                  type="tel"
                  value={user.phoneValue}
                  onChange={onChange}
                  error={errors.phone} />
          <Input styleClass="user-input"
                  name="password"
                  label="Contraseña"
                  type="password"
                  value={user.passwordValue}
                  onChange={onChange}
                  error={errors.password} />
          <Input styleClass="user-input"
                  name="password_confirmation"
                  label="Repetir Contraseña"
                  type="password"
                  value={user.confirmedPasswordValue}
                  onChange={onChange}
                  error={errors.password_confirmation} />
          <input className="btn user-submit-btn bg-orange-color"
                  type="submit"
                  value="ENVIAR"
                  onClick={onSave} />
        </div>
      </Col>
    </Row>
  );
};

const { object, func } = PropTypes;

UserForm.propTypes = {
  user: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  errors: object
};

export default UserForm;
