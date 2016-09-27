import React, { PropTypes } from 'react';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';
import '../../styles/animal-list.scss';

const MiniInfoPerfil = ({ animal }) => {
  let imagen = animal.profile_image_thumb;
  return (
    <div className="mini-profile-flex" >
      <img className="mini-perfil-image" src={imagen} />
      <table className="mini-tabel-div table-responsive">
        <tbody>
          <tr>
            <th><b>Num. Chip</b></th>
            <th><b>Raza</b></th>
            <th><b>Sexo</b></th>
          </tr>
          <tr>
            <td>{animal.chip_num}</td>
            <td>{animal.race}</td>
            <td>{animal.sex}</td>
          </tr>
        </tbody>
      </table>
      <table className="mini-tabel-div table-responsive">
        <tbody>
          <tr>
            <th><b>Peso</b></th>
            <th><b>Castrado</b></th>
          </tr>
          <tr>
            <td>{animal.weight == null ? '' : animal.weight.toString().concat(" KG")}</td>
            <td>{(animal.castrado ? <font color="green"> SI </font> : <font color="red"> NO </font>)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const { object } = PropTypes;

MiniInfoPerfil.propTypes = {
  animal: object.isRequired
};

export default MiniInfoPerfil;
