import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import { Image } from 'react-bootstrap';
import '../../../styles/images-dropzone.scss';
import '../../../styles/animal-perfil.scss';

class EditProfileDropzone extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      click: false
    };

    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    const { click } = this.state;
    if (!click) {
      this.dropzone.open();
      this.setState({ click: true });
      const timeout = () => {
        this.setState({ click: false });
      };
      setTimeout( timeout, 1000);
    }
  }

  render() {
    const perfImage = (<Image className="edit-profile-image" src={this.props.animal.profile_image} rounded />);
    const { preview } = this.props.profilePic;
    const image = (<img className="profile-image" src={preview} />);
    const no_image = (<i className="material-icons">add_a_photo</i> );
    const picture = Object.keys(this.props.profilePic).length === 0 ? no_image : image;
    let dropStyleClass = preview ? 'profile-dropzone' : 'profile-dropzone-not-bordes';
    let drop = (<Dropzone className={dropStyleClass}
                        activeClassName="dropzone-active"
                        ref={(node) => {
                          this.dropzone = node;
                        }}
                        onDrop={this.props.onDrop}
                        multiple={false}
                        disableClick={true}
                        accept="image/*"
                        >
                    <div className="click-div" onClick={this.onOpenClick}>
                      {preview ? picture : perfImage}
                    </div>
                  </Dropzone>);
    return (
      <div className="edit-dropzone">
        <p>Foto de perfil {preview && '(editada)'}</p>
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
