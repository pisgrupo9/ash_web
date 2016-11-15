import React, { PropTypes } from 'react';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';
import { Checkbox } from 'react-bootstrap';
import ImagesDropzone from '../common/ImagesDropzone';
import ProfileDropzone from './ProfileDropzone';
import ModalAnimalButtons from '../common/ModalAnimalButtons';
import * as util from '../../util/validateForm';
import * as consts from '../../constants/apiConstants.js';

const AnimalForm = ({ animal, species, images, profilePic, onSave, onChange, onCancel, onDrop, onDropProfile, onDelete, errors }) => {

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

  let showCheckboxes = (animal.species_id == "1" || animal.species_id == "2");

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input"
                name="chip_num"
                label="Número de chip"
                type="text"
                value={animal.chip_num}
                onChange={onChange}
                error={errors.chip_num}
                 />
        <Input styleClass="animal-input"
                name="name"
                label="Nombre *"
                type="text"
                value={animal.name}
                onChange={onChange}
                error={errors.name}
                 />
        <SelectInput styleClass="animal-input"
                      name="sex"
                      label="Sexo *"
                      value={animal.sex}
                      onChange={onChange}
                      options={consts.GENEDERS}
                      error={errors.sex}
                       />
        <Input styleClass="animal-input"
                name="weight"
                label="Peso"
                type="number"
                value={animal.weight}
                onChange={onChange}
                error={errors.weight}
                 />
        <Input styleClass="animal-input"
                name="admission_date"
                label="Fecha de ingreso *"
                type="date"
                value={animal.admission_date}
                onChange={onChange}
                error={errors.admission_date}
                 />
        <SelectInput styleClass="animal-input"
                      name="species_id"
                      label="Especie *"
                      value={animal.species_id}
                      onChange={onChange}
                      options={species}
                      error={errors.species_id}
                      />
        <Input styleClass="animal-input"
                name="race"
                label={util.requiredRace(animal.species_id) ? "Raza *" : "Raza"}
                type="text"
                value={animal.race}
                onChange={onChange}
                error={errors.race}
                 />
        <Input styleClass="animal-input"
                name="birthdate"
                label="Fecha de Nacimiento *"
                type="month"
                placeholder="MM/AA"
                value={animal.birthdate}
                onChange={onChange}
                error={errors.birthdate}
                 />
        <Input styleClass="animal-input"
                name="death_date"
                label="Fecha de muerte"
                type="date"
                value={animal.death_date}
                onChange={onChange}
                error={errors.death_date}
                 />
      </div>
      <div>
        { showCheckboxes ? checkboxCastrated : ''}
        { showCheckboxes ? checkboxVaccines : ''}
      </div>
      <div className="dropzones-container">
        <ProfileDropzone profilePic={profilePic}
                         onDrop={onDropProfile}
                         error={errors.profile_image} />
        <ImagesDropzone title="Galeria"
                        images={images}
                        onDrop={onDrop}
                        onDelete={onDelete} />
      </div>
      <ModalAnimalButtons title="INGRESAR" onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func, array, string } = PropTypes;

AnimalForm.propTypes = {
  animal: object.isRequired,
  species: array.isRequired,
  images: array.isRequired,
  profilePic: string.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired,
  onDropProfile: func.isRequired,
  errors: object.isRequired
};

export default AnimalForm;
