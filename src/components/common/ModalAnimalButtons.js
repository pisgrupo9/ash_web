import React, { PropTypes } from 'react';

const ModalButtons = ({ title, onSubmit, onClose }) => {
  return (
    <div className="buttons-wrapper">
      <input className="btn"
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
