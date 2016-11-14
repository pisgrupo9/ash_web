import React, { PropTypes } from 'react';
import Input from '../../common/Input';
import ModalAnimalButtons from '../../common/ModalAnimalButtons';

const AdopterFormEdit = ({ adopter, onSave, onChange, onCancel, errors }) => {

  const errorsFullName = errors.firstName || errors.lastName;

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input"
                name="fullName"
                label="Nombre y Apellido *"
                type="text"
                value={adopter.fullName}
                onChange={onChange}
                error={errorsFullName}
                 />
        <Input styleClass="animal-input disable"
                name="ci"
                label="CI"
                type="text"
                disabled={true}
                value={adopter.ci}
                 />
        <Input styleClass="animal-input"
                name="email"
                label="Email"
                type="text"
                value={adopter.email}
                onChange={onChange}
                error={errors.email}
                 />
        <Input styleClass="animal-input"
                name="phone"
                label="Teléfono *"
                type="text"
                value={adopter.phone}
                onChange={onChange}
                error={errors.phone}
                 />
        <Input styleClass="animal-input"
                name="homeAddress"
                label="Dirección *"
                type="text"
                value={adopter.homeAddress}
                onChange={onChange}
                error={errors.homeAddress}
                 />
        </div>
        <Input styleClass="animal-input textarea"
                name="houseDescription"
                label="Descripción de la casa"
                type="textarea"
                value={adopter.houseDescription}
                onChange={onChange}
                error={errors.houseDescription}
                 />

      <ModalAnimalButtons title="GUARDAR" onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func } = PropTypes;

AdopterFormEdit.propTypes = {
  adopter: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  errors: object.isRequired
};

export default AdopterFormEdit;
