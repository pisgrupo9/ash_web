import React, { PropTypes } from 'react';
import Input from '../../common/Input';
import ImagesDropzone from '../../common/ImagesDropzone';
import ModalAnimalButtons from '../../common/ModalAnimalButtons';

const EventForm = ({ event, images, onSave, onChange, onCancel, onDrop, onDelete, errors }) => {

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input"
                name="name"
                label="TÍTULO *"
                type="text"
                value={event.name}
                onChange={onChange}
                error={errors.name}
                 />
        <Input styleClass="animal-input"
                name="date"
                label="FECHA *"
                type="date"
                value={event.date}
                onChange={onChange}
                error={errors.date}
                 />
        <Input styleClass="animal-input"
                name="description"
                label="DESCRIPCIÓN"
                type="text"
                value={event.description}
                onChange={onChange}
                error={errors.description}
                 />
      </div>
      <div className="dropzones-container">
        <ImagesDropzone title="Galeria"
                        images={images}
                        onDrop={onDrop}
                        onDelete={onDelete} />
      </div>
      <ModalAnimalButtons onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func, array } = PropTypes;

EventForm.propTypes = {
  event: object.isRequired,
  images: array.isRequired,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onCancel: func.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired,
  errors: object.isRequired
};

export default EventForm;
