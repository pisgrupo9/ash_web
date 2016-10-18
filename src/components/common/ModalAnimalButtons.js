import React, { PropTypes } from 'react';
import '../../styles/animal-form.scss';

const ModalButtons = ({ title, onSubmit, onClose }) => {
  return (
    <div className="animal-buttons">
      <input className="btn submit-button"
              type="submit"
              value={title || "ENVIAR"}
              onClick={onSubmit} />
      <button className="btn cancel-button" onClick={onClose}>
        CANCELAR
      </button>
    </div>
  );
};

const { func, string } = PropTypes;

ModalButtons.propTypes = {
  title: string,
  onSubmit: func.isRequired,
  onClose: func.isRequired
};

export default ModalButtons;
