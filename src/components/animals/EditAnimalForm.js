import React, { PropTypes } from 'react';
import Input from '../common/Input';
import SelectInput from '../common/SelectInput';
import { Checkbox } from 'react-bootstrap';

const EditAnimalForm = ({ animal, onSave, onChange, onCancel, errors }) => { 

 const genders = [ { id: "male", name: "Macho" },
                    { id: "female", name: "Hembra" } ];

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
     <img className="perfil-image center" src={imagen} />
      <div className="center tabel-div" >
        <table className="table-borderless">
            <tbody>
              <tr>
                <th><b>NOMBRE:</b></th>
                <th><b>{animal.name}</b></th>
              </tr>
              <tr>
                <td>NÚM. DE CHIP:</td>
                <td>{animal.chip_num}</td>
              </tr>
              <tr>
                <td>ESPECIE:</td>
                <td>{animal.species}</td>
              </tr>
              <tr>
                <td>SEXO:</td>
                <td>
                    <SelectInput styleClass="animal-input"
                          name="sex"
                          value={animal.sex}
                          onChange={onChange}
                          options={genders}/>
                </td>
              </tr>
              <tr>
                <td>RAZA:</td>
                <td>
                     <Input styleClass="animal-input"
                        name="race"
                        value={animal.race}
                        onChange={onChange}/>
                </td>
              </tr>
              <tr>
                <td>FEC. DE NAC.:</td>
                <td >
                  <Input styleClass="animal-input"
                            name="birthdate"
                            type="month"
                            value={fecha_cumple.substring(0, fecha_cumple.length - 3)}
                            onChange={onChange}/>
                </td>
              </tr>
              <tr>
                <td>FEC. DE ING.:</td>
                <td>
                    <Input styleClass="animal-input"
                        name="admission_date"
                        type="date"
                        value={animal.admission_date}
                        onChange={onChange}/>
                </td>
              </tr>
              <tr>
                <td>FEC. DE MUERTE:</td>
                <td>
                    <Input styleClass="animal-input"
                        name="death_date"
                        type="date"
                        value={animal.death_date}
                        onChange={onChange}/>
                </td>
              </tr>
              <tr>
                <td>VACUNADO:</td>
                <td>
                    <SelectInput styleClass="animal-input"
                          name="vaccines"
                          value={animal.vaccines.toString()}
                          onChange={onChange}
                          options={yes_no}/>
                </td>
              </tr>
              <tr>
                <td>CASTRADO:</td>
                <td>
                    <SelectInput styleClass="animal-input"
                          name="castrated"
                          value={animal.castrated.toString()}
                          onChange={onChange}
                          options={yes_no}/>
                </td>
              </tr>
            </tbody>
        </table>
         <div>
              <input className="btn submit-button"
                      type="submit"
                      value="GUARDAR"
                      onClick={onSave} />
              <button className="btn cancel-button" onClick={onCancel}>
                CANCELAR
              </button>
          </div>
      </div>
      <ModalAnimalButtons onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func, array } = PropTypes;

EditAnimalForm.propTypes = {
  animal: object.isRequired,
  species: array.isRequired,
  images: array.isRequired,
  profilePic: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired,
  onDropProfile: func.isRequired,
  errors: object.isRequired
};

export default EditAnimalForm;
