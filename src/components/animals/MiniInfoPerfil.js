import React, { PropTypes } from 'react';
import '../../styles/mini-view.scss';

const MiniInfoPerfil = ({ animal }) => {
  let imagen = animal.profile_image_thumb;
  let catDog = (animal.species_id == "1" || animal.species_id == "2");
  let tick = (<i className="material-icons green-color">done</i>);
  let cross = (<i className="material-icons red-color">clear</i>);
  let castrated = (<div className="flex-items">
          <div className="vertical-flex-container left-border">
            <div className="vertical-flex bottom-border titles-font">Castrado</div>
            <div className="vertical-flex">{animal.castrated ? tick : cross}</div>
          </div>
        </div>);
  return (
    <div className="big-flex-container" >
      <div className="image-flex">
        <img className="image-animal" src={imagen} />
      </div>
      <div className="flex-items">
        <div className="vertical-flex-container">
          <div className="vertical-flex bottom-border titles-font">Raza</div>
          <div className="vertical-flex dark-grey-color">{animal.race ? animal.race : 'N/A'}</div>
        </div>
      </div>
      <div className="flex-items">
        <div className="vertical-flex-container">
          <div className="vertical-flex bottom-border titles-font">Sexo</div>
          <div className="vertical-flex dark-grey-color">{animal.sex}</div>
        </div>
      </div>
      <div className="flex-items">
        <div className="vertical-flex-container">
          <div className="vertical-flex bottom-border titles-font">Peso</div>
          <div className="vertical-flex dark-grey-color">{animal.weight ? animal.weight : 'N/A'}</div>
        </div>
      </div>
      {catDog ? castrated : ''}
    </div>
  );
};

const { object } = PropTypes;

MiniInfoPerfil.propTypes = {
  animal: object.isRequired
};

export default MiniInfoPerfil;
