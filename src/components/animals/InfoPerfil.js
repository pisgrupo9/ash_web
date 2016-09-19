import React, { PropTypes } from 'react';
import SelectInput from '../common/SelectInput';
import Input from '../common/Input';

const InfoPerfil = ({ animal, edit, editState, onChange, onSave, onCancel, styleClass }) => {
  let imagen = animal.profile_image;
  const genders = [ { id: "male", name: "Macho" },
                    { id: "female", name: "Hembra" } ];
  const yes_no = [ { id: "true", name: "SI" },
                   { id: "false", name: "NO" } ];

  let fecha_cumple = animal.birthdate && animal.birthdate.length == 10 ? animal.birthdate.substring(0, animal.birthdate.length - 3) : animal.birthdate;

  return (
    <div className={(styleClass ? styleClass+' ' : '')+ 'perfil-box'}>
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
                <td>{(editState.edit
                      ? <SelectInput styleClass="profile-animal-input"
                          name="sex"
                          value={animal.sex}
                          onChange={onChange}
                          options={genders}/>
                      : animal.sex)}
                </td>
              </tr>
              <tr>
                <td>RAZA:</td>
                <td>{(editState.edit
                      ? <Input styleClass="profile-animal-input"
                          name="race"
                          type="text"
                          value={animal.race}
                          onChange={onChange}/>
                      : animal.race)}
                </td>
              </tr>
              <tr>
                <td>FEC. DE NAC.:</td>
                <td >{(editState.edit
                        ? <Input styleClass="profile-animal-input"
                            name="birthdate"
                            type="month"
                            value={fecha_cumple}
                            onChange={onChange}/>
                        : animal.birthdate)}
                </td>
              </tr>
              <tr>
                <td>FEC. DE ING.:</td>
                <td>{(editState.edit
                    ? <Input styleClass="profile-animal-input"
                        name="admission_date"
                        type="date"
                        value={animal.admission_date}
                        onChange={onChange}/>
                    : animal.admission_date)}
                </td>
              </tr>
              <tr>
                <td>FEC. DE MUERTE:</td>
                <td>{(editState.edit
                    ? <Input styleClass="profile-animal-input"
                        name="death_date"
                        type="date"
                        value={animal.death_date}
                        onChange={onChange}/>
                    : animal.death_date)}
                </td>
              </tr>
              <tr>
                <td>VACUNADO:</td>
                <td>{(editState.edit
                      ? <SelectInput styleClass="profile-animal-input"
                          name="vaccines"
                          value={animal.vaccines.toString()}
                          onChange={onChange}
                          options={yes_no}/>
                      : animal.vaccines ? <font color="green"> SI </font> : <font color="red"> NO </font>)}
                </td>
              </tr>
              <tr>
                <td>CASTRADO:</td>
                <td>{(editState.edit
                      ? <SelectInput styleClass="profile-animal-input"
                          name="castrated"
                          value={animal.castrated.toString()}
                          onChange={onChange}
                          options={yes_no}/>
                      : animal.castrated ? <font color="green"> SI </font> : <font color="red"> NO </font>)}
                </td>
              </tr>
            </tbody>
        </table>
        { editState.edit
          ? <div><input className="btn submit-button"
                      type="submit"
                      value="GUARDAR"
                      onClick={onSave} />
              <button className="btn cancel-button" onClick={onCancel}>
                CANCELAR
              </button></div>
          :
           <button className="button-animal" onClick={edit}>
             <i className="material-icons">mode_edit</i>
           </button>
        }
      </div>
    </div>
  );
};

const { object, func, string } = PropTypes;

InfoPerfil.propTypes = {
  animal: object.isRequired,
  edit: func.isRequired,
  editState: object.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  styleClass: string
};

export default InfoPerfil;
