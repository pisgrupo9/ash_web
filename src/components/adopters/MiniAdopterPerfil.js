import React, { PropTypes } from 'react';
import '../../styles/mini-view.scss';

const MiniAdopterPerfil = ({ adopter }) => {
  return (
    <div>
      <div className="big-flex-container" >
        <div className="flex-items">
          <div className="vertical-flex-container">
            <div className="vertical-flex bottom-border titles-font">Dirección</div>
            <div className="vertical-flex dark-grey-color">{adopter.home_address ? adopter.home_address : 'N/A'}</div>
          </div>
        </div>
        <div className="flex-items">
          <div className="vertical-flex-container">
            <div className="vertical-flex bottom-border titles-font">Teléfono</div>
            <div className="vertical-flex dark-grey-color">{adopter.phone}</div>
          </div>
        </div>
        <div className="flex-items">
          <div className="vertical-flex-container">
            <div className="vertical-flex bottom-border titles-font">Email</div>
            <div className="vertical-flex dark-grey-color">{adopter.email ? adopter.email : 'N/A'}</div>
          </div>
        </div>
        <div className="flex-items">
          <div className="vertical-flex-container">
            <div className="vertical-flex bottom-border titles-font">Adoptados</div>
              <div className="vertical-flex dark-grey-color">
                <p>{adopter.animals.length}</p>
              </div>
          </div>
        </div>
      </div>
      <div className="description-container">{adopter.house_description ? adopter.house_description : ''}</div>
    </div>
  );
};

const { object } = PropTypes;

MiniAdopterPerfil.propTypes = {
  adopter: object.isRequired
};

export default MiniAdopterPerfil;
