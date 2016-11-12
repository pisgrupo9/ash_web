import React, { PropTypes } from 'react';

import Input from '../../common/Input';
import EditProfileDropzone from './EditProfileDropzone';
import SelectInput from '../../common/SelectInput';
import * as util from '../../../util/validateForm';
import { Checkbox } from 'react-bootstrap';
import ModalAnimalButtons from '../../common/ModalAnimalButtons';
import '../../../styles/animal-perfil.scss';

const AnimalEditForm = ({ animal, species, profilePic, onSave, onClose, onChange, onDropProfile, errors }) => {

  let fecha_cumple = animal.birthdate &&
                                animal.birthdate.length == 10
                                ? animal.birthdate.substring(0, animal.birthdate.length - 3)
                                : animal.birthdate;
  const checkboxCastrated = (<Checkbox className="animal-input animal-checkbox"
                                      name="castrated"
                                      onChange={onChange}
                                      checked={animal.castrated}>
                              Castrado
                            </Checkbox>);

  const checkboxVaccines = (<Checkbox className="animal-input animal-checkbox"
                                      name="vaccines"
                                      onChange={onChange}
                                      checked={animal.vaccines}>
                              Vacunas
                            </Checkbox>);
  let showCheckboxes = animal.species_id.toString() === "1" || animal.species_id.toString() === "2";
  const genders = [ { id: "Macho", name: "Macho" },
                   { id: "Hembra", name: "Hembra" } ];
  return (
    <div>
      <EditProfileDropzone profilePic={profilePic} onDrop={onDropProfile} animal={animal} />
      <div className="form-container">
        <p> * campos necesarios </p>
        <div className="animal-form">
          <Input styleClass="profile-animal-input"
                          name="chip_num"
                          label="Num. Chip"
                          type="text"
                          value={animal.chip_num != null ? animal.chip_num : ""}
                          onChange={onChange}
                          error={errors.chip_num}/>
          <Input styleClass="profile-animal-input"
                          name="name"
                          label="Nombre *"
                          type="text"
                          value={animal.name != null ? animal.name : ""}
                          onChange={onChange}
                          error={errors.name}/>
          <SelectInput styleClass="profile-animal-input"
                      name="species_id"
                      label="Especie *"
                      value={animal.species_id.toString()}
                      onChange={onChange}
                      options={species}
                      edit={true}
                      error={errors.species_id}/>
          <SelectInput styleClass="profile-animal-input"
                          name="sex"
                          label="Sexo *"
                          value={animal.sex}
                          onChange={onChange}
                          options={genders}
                          edit={true}
                          error={errors.sex}/>
          <Input styleClass="profile-animal-input"
                          name="race"
                          label={util.requiredRace(animal.species_id) ? "Raza *" : "Raza"}
                          type="text"
                          value={animal.race != null ? animal.race : ""}
                          onChange={onChange}
                          error={errors.race}/>
          <Input styleClass="profile-animal-input"
                          name="birthdate"
                          label="Fecha de Nacimiento *"
                          type="month"
                          value={fecha_cumple}
                          onChange={onChange}
                          error={errors.birthdate}/>
          <Input styleClass="profile-animal-input"
                        name="admission_date"
                        label="Fecha de Ingreso *"
                        type="date"
                        value={animal.admission_date}
                        onChange={onChange}
                        error={errors.admission_date}/>
          <Input styleClass="profile-animal-input"
                        name="death_date"
                        label="Fecha de Muerte"
                        type="date"
                        value={animal.death_date != null ? animal.death_date : ""}
                        onChange={onChange}
                        error={errors.death_date}/>
          <Input styleClass="profile-animal-input"
                          name="weight"
                          label="Peso"
                          type="number"
                          value={animal.weight != null ? animal.weight.toString() : ""}
                          onChange={onChange}
                          error={errors.weight}/>

          </div>
          <div>
            { showCheckboxes ? checkboxCastrated : ''}
            { showCheckboxes ? checkboxVaccines : ''}
          </div>
          <ModalAnimalButtons title="GUARDAR" onSubmit={onSave} onClose={onClose} />
      </div>
    </div>
  );
};

const { object, array, func, string } = PropTypes;

AnimalEditForm.propTypes = {
  animal: object.isRequired,
  species: array.isRequired,
  profilePic: string.isRequired,
  onSave: func.isRequired,
  onClose: func.isRequired,
  onChange: func.isRequired,
  onDropProfile: func.isRequired,
  errors: object.isRequired
};

export default AnimalEditForm;
