import React, { PropTypes } from 'react';
import Dropzone from 'react-dropzone';
import '../../styles/images-dropzone.scss';

const ProfileDropzone = ({ profilePic, onDrop, error }) => {
  const image = (<img className="profile-image" src={profilePic.preview} />);
  const no_image = (<i className="material-icons">add_a_photo</i> );
  const picture = Object.keys(profilePic).length === 0 ? no_image : image;

  return (
    <div className="dropzone-profile-container">
      <p>Foto de perfil *</p>
        <Dropzone className="profile-dropzone"
                  activeClassName="dropzone-active"
                  onDrop={onDrop}
                  multiple={false}
                  accept="image/*">
          <div> {picture} </div>
        </Dropzone>
      {error && <div className="alert alert-danger error-dropzone">{error}</div>}
    </div>
    );
};

const { func, object, string } = PropTypes;

ProfileDropzone.propTypes = {
  onDrop: func.isRequired,
  profilePic: object.isRequired,
  error: string
};

export default ProfileDropzone;
