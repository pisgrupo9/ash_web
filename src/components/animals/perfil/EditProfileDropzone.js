import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import { Image } from 'react-bootstrap';
import '../../../styles/images-dropzone.scss';
import '../../../styles/animal-perfil.scss';

class EditProfileDropzone extends Component {
  constructor(props, context) {
    super(props, context);
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    this.dropzone.open();
  }

  render() {
    const image = (<img className="profile-image" src={this.props.profilePic.preview} />);
    const no_image = (<i className="material-icons">add_a_photo</i> );
    const picture = Object.keys(this.props.profilePic).length === 0 ? no_image : image;
    let drop = (<Dropzone className="profile-dropzone"
                        activeClassName="dropzone-active"
                        ref={(node) => {
                          this.dropzone = node;
                        }}
                        onDrop={this.props.onDrop}
                        multiple={false}
                        accept="image/*"
                        >
                    <div> {picture} </div>
                  </Dropzone>);
    let perfImage = (<div className="edit-image-container">
                      <Image className="edit-profile-image" src={this.props.animal.profile_image} rounded />
                    </div>);
    return (
      <div className="edit-dropzone">
        <p>Foto de perfil</p>
          { perfImage }
        <div className="drop-visible-container">
          {drop}
        </div>
        <button type="button" className="btn-circle-edit" onClick={this.onOpenClick}>
          <i className="material-icons color">mode_edit</i>
        </button>
        {this.props.error && <div className="alert alert-danger error-dropzone">{this.props.error}</div>}
      </div>
    );
  }
}

const { func, object, string } = PropTypes;

EditProfileDropzone.propTypes = {
  onDrop: func.isRequired,
  profilePic: object.isRequired,
  animal: object.isRequired,
  error: string
};

export default EditProfileDropzone;
