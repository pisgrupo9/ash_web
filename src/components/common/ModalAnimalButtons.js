import React, { PropTypes } from 'react';
import '../../styles/animal-form.scss';

const ModalButtons = ({ onSubmit, onClose }) => {
  return (
    <div className="animal-buttons">
      <input className="btn submit-button"
              type="submit"
              value="ENVIAR"
              onClick={onSubmit} />
      <button className="btn cancel-button" onClick={onClose}>
        CANCELAR
      </button>
    </div>
  );
};

const { func } = PropTypes;

ModalButtons.propTypes = {
  onSubmit: func.isRequired,
  onClose: func.isRequired
};

export default ModalButtons;
