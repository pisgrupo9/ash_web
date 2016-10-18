import React, { PropTypes } from 'react';
import AnimalListAdoption from '../components/adoptions/AnimalListAdoption';
import '../styles/animal-list.scss';

const AddAdoptionModal = ({ adopterId, onClose }) => {
  return (
    <div className="list-flex">
      <div className="wrapper-flex-modal">
        <AnimalListAdoption onClose={onClose} adopterId={adopterId}/>
      </div>
    </div>
  );
};

const { func, string } = PropTypes;

AddAdoptionModal.propTypes = {
  onClose: func.isRequired,
  adopterId: string.isRequired
};

export default AddAdoptionModal;
