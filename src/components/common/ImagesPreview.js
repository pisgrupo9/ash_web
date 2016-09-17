import React, { PropTypes } from 'react';
import '../../styles/images-dropzone.scss';

const ImagesPreview = ({ images, onDelete }) => {
  let multiplePhotos = images.length > 1;
  let showPreview = images.length > 0;

  return (
    <div className="images-preview-container">
      {showPreview ? <div>
        <p>
          Vista Previa ({images.length} {multiplePhotos ? 'fotos' : 'foto'})
        </p>
        <div className="images-preview">
          {images.map((image) => (
            <div className="image-wrapper" key={image.name}>
              <button className="remove-button" onClick={() => onDelete(image.name)}>
                <i className="material-icons remove-icon">highlight_off</i>
              </button>
              <img className="image-preview" src={image.preview} />
            </div>
          ))}
        </div>
        </div> : null}
    </div>
  );
};

const { func, array } = PropTypes;

ImagesPreview.propTypes = {
  images: array.isRequired,
  onDelete: func.isRequired
};

export default ImagesPreview;
