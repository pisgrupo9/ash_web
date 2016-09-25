import React, { PropTypes } from 'react';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';
import '../../styles/animal-list.scss';

const MiniInfoPerfil = ({ animal }) => {
  return (
    <div className="mini-profile-flex" >
      <img className={'mini-perfil-image'} src="https://images-na.ssl-images-amazon.com/images/G/01/img15/pet-products/small-tiles/23695_pets_vertical_store_dogs_small_tile_8._CB312176604_.jpg" />
      <table className="mini-tabel-div table-responsive">
        <tbody>
          <tr>
            <td><b>Num. Chip</b></td>
            <td><b>Raza</b></td>
            <td><b>Sexo</b></td>
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
            <td><b>Castrado</b></td>
            <td><b>Vacunado</b></td>
          </tr>
          <tr>
            <td>{(animal.vaccines ? <font color="green"> SI </font> : <font color="red"> NO </font>)}</td>
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
