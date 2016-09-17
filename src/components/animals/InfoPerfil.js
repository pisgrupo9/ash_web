import React, { PropTypes } from 'react';

const InfoPerfil = ({ animal }) => {
  let vaccines = animal.vaccines;
  let castrado = animal.castrated;
  let imagen = animal.profile_image;

  return (
    <div className="Perfil-box">
      <img className="Pimage-header" src={imagen} />
        <div className="Prow">
          <table className="table-borderless">
            <tbody>
              <tr>
                <th>NOMBRE:</th>
                <th>{animal.name}</th>
              </tr>
              <tr>
                <td>NÚM. DE CHIP:</td>
                <td>{animal.chip_num}</td>
              </tr>
              <tr>
                <td>SEXO:</td>
                <td>{animal.sex}</td>
              </tr>
              <tr>
                <td>FECHA DE NAC.:</td>
                <td>{animal.birthdate}</td>
              </tr>
              <tr>
                <td>FECHA DE ING.:</td>
                <td >{animal.admission_date}</td>
              </tr>
              <tr>
                <td>VACUNADO:</td>
                <td>
                {(vaccines ? <font color="green"> SI </font> : <font color="red"> NO </font>)}
                </td>
              </tr>
              <tr>
                <td>CASTRADO:</td>
                <td>
                {(castrado ? <font color="green"> SI </font> : <font color="red"> NO </font>)}
                </td>
              </tr>
              <tr>
                <td>ESTADO:</td>
                <td>a definir...</td>
              </tr>
              <tr>
                <td>PESO:</td>
                <td>a definir...</td>
              </tr>
            </tbody>
        </table>
      </div>
    </div>
  );
};

const { object } = PropTypes;

InfoPerfil.propTypes = {
  animal: object.isRequired
};

export default InfoPerfil;
