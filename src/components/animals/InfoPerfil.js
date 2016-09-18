import React, { PropTypes } from 'react';
import Spinner from '../common/SpinnerComponet';

const InfoPerfil = ({ animal, styleClass, loading }) => {

  let vaccines = animal.vaccines;
  let castrado = animal.castrated;
  let imagen = animal.profile_image;

  return (
    <div className={(styleClass ? styleClass+' ' : '')+ 'perfil-box'}>
      { loading ? (<Spinner active={loading} />) : (
      <div>
        <img className={'perfil-image center'} src={imagen} />
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
      )}
    </div>
  );
};

const { object, string, bool } = PropTypes;

InfoPerfil.propTypes = {
  animal: object.isRequired,
  styleClass: string,
  loading: bool.isRequired,
};

export default InfoPerfil;
