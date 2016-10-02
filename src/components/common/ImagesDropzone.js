import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import ImagesPreview from './ImagesPreview';
import '../../styles/images-dropzone.scss';

const ImagesDropzone = ({ images, title, onDrop, onDelete }) => {
  return (
    <div className="dropzone-container">
      <p>{title}</p>
      <Dropzone className="dropzone"
                activeClassName="dropzone-active"
                accept="image/*"
                onDrop={onDrop}>
        <p className="dropzone-text">
          Arrastre las imágenes aquí o haga click para seleccionarlas manualmente
        </p>
      </Dropzone>
      <ImagesPreview images={images} onDelete={onDelete}/>
    </div>
  );
};

const { array, func, string } = PropTypes;

ImagesDropzone.propTypes = {
  title: string,
  images: array.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired
};

export default ImagesDropzone;
