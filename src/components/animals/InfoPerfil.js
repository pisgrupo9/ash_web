import React, { PropTypes } from 'react';
import Spinner from '../common/SpinnerComponent';
import ImageLightBox from '../common/ImageLightBox';

const InfoPerfil = ({ animal, loading, styleClass }) => {
  let imagen = animal.profile_image;
  let especieOption = animal.species == "Perro" || animal.species == "Gato";
  return (
    <div className={(styleClass ? styleClass+' ' : '')+ 'perfil-box'}>
      { loading ? (<Spinner active={loading} />) : (
      <div>
        <ImageLightBox imageStyle={'perfil-image center'}
                        imageSmall={imagen}
                        imageFull={imagen}/>
        <div className="center tabel-div" >
          <table className="table-borderless">
            <tbody>
              <tr>
                <td><b>NOMBRE:</b></td>
                <td><b>{animal.name}</b></td>
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
                <td>{animal.sex}</td>
              </tr>
              <tr>
                <td>RAZA:</td>
                <td>{animal.race}</td>
              </tr>
              <tr>
                <td>PESO:</td>
                <td>{animal.weight ? animal.weight.toString().concat(' KG')
                                    : '' }
                </td>
              </tr>
              <tr>
                <td>FEC. DE NAC.:</td>
                <td >{animal.birthdate}</td>
              </tr>
              <tr>
                <td>FEC. DE ING.:</td>
                <td>{animal.admission_date}</td>
              </tr>
              <tr>
                <td>FEC. DE MUERTE:</td>
                <td>{animal.death_date}</td>
              </tr>
              <tr>
                <td>VACUNADO:</td>
                <td>{especieOption &&
                      (animal.vaccines ? <font color="green"> SI </font>
                                        : <font color="red"> NO </font>)}
                </td>
              </tr>
              <tr>
                <td>CASTRADO:</td>
                <td>{especieOption &&
                      (animal.castrated ? <font color="green"> SI </font>
                                        : <font color="red"> NO </font>)}
                </td>
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
  loading: bool.isRequired,
  styleClass: string
};

export default InfoPerfil;
