import React, { PropTypes } from 'react';
import SelectInput from '../components/common/SelectInput';
import Input from '../components/common/Input';
import '../styles/animal-perfil.scss';
import '../styles/animal-form.scss';
import ProfileDropzone from '../components/animals/ProfileDropzone';

const EditAnimalModal = ({ animal, onChange, onSave, onClose, onDrop, profilePic }) => {
  const genders = [ { id: "male", name: "Macho" },
                    { id: "female", name: "Hembra" } ];
  const yes_no = [ { id: "true", name: "SI" },
                   { id: "false", name: "NO" } ];
  let fecha_cumple = animal.birthdate && animal.birthdate.length == 10 ? animal.birthdate.substring(0, animal.birthdate.length - 3) : animal.birthdate;
  let EspecieOption = animal.species == "Perro" || animal.species == "Gato";

  return (
    <div className="animal-form-wrapper">
      <h2 className="animal-form-title"> EDITAR ANIMALES </h2>
      <div className="dropzones-container">
        <ProfileDropzone profilePic={profilePic}
                         onDrop={onDrop} />
      </div>
      <div className="form-container">
        <div className="animal-form">
          <SelectInput styleClass="profile-animal-input"
                          name="sex"
                          label="Sexo"
                          value={animal.sex}
                          onChange={onChange}
                          options={genders}
                          edit={true}/>
          <Input styleClass="profile-animal-input"
                          name="race"
                          label="Raza"
                          type="text"
                          value={animal.race != null ? animal.race : ""}
                          onChange={onChange}/>
          <Input styleClass="profile-animal-input"
                            name="birthdate"
                            label="Fecha de Nacimiento"
                            type="month"
                            value={fecha_cumple}
                            onChange={onChange}/>
          <Input styleClass="profile-animal-input"
                        name="admission_date"
                        label="Fecha de Ingreso"
                        type="date"
                        value={animal.admission_date}
                        onChange={onChange}/>
          <Input styleClass="profile-animal-input"
                        name="death_date"
                        label="Fecha de Muerte"
                        type="date"
                        value={animal.death_date != null ? animal.death_date : ""}
                        onChange={onChange}/>
          {EspecieOption &&
          <SelectInput styleClass="profile-animal-input"
                          name="vaccines"
                          label="Vacunado"
                          value={animal.vaccines.toString()}
                          onChange={onChange}
                          options={yes_no}
                          edit={true}/>}
          {EspecieOption &&
          <SelectInput styleClass="profile-animal-input"
                          name="castrated"
                          label="Castrado"
                          value={animal.castrated.toString()}
                          onChange={onChange}
                          options={yes_no}
                          edit={true}/>}
          </div>
          <div className="animal-buttons">
            <input className="btn submit-button"
                      type="submit"
                      value="GUARDAR"
                      onClick={onSave}/>
            <button className="btn cancel-button" onClick={onClose}>
              CANCELAR
            </button>
          </div>
      </div>
    </div>
   );
};

const { object, func } = PropTypes;

EditAnimalModal.propTypes = {
  animal: object.isRequired,
  profilePic: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onClose: func.isRequired,
  onDrop: func.isRequired
};

export default EditAnimalModal;
