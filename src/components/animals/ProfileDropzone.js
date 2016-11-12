import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import '../../styles/images-dropzone.scss';

class ProfileDropzone extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      click: false
    };
    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    const { click } = this.state;
    const timeout = () => {
      this.setState({ click: false });
    };
    if (!click) {
      this.dropzone.open();
      this.setState({ click: true });
      setTimeout( timeout, 1000);
    }
  }

  render() {
    const { profilePic, onDrop, error } = this.props;
    const image = (<img className="profile-image" src={profilePic} />);
    const no_image = (<i className="material-icons">add_a_photo</i> );
    const picture = Object.keys(profilePic).length === 0 ? no_image : image;
    const ref = (node) => {
      this.dropzone = node;
    };
    return (
      <div className="dropzone-profile-container">
        <p>Foto de perfil *</p>
          <Dropzone className="profile-dropzone"
                    activeClassName="dropzone-active"
                    onDrop={onDrop}
                    ref={ref}
                    multiple={false}
                    accept="image/*"
                    disableClick={true}>
            <div className="click-div" onClick={this.onOpenClick}> {picture} </div>
          </Dropzone>
        {error && <div className="alert alert-danger error-dropzone">{error}</div>}
      </div>
    );
  }
}

const { func, string } = PropTypes;

ProfileDropzone.propTypes = {
  onDrop: func.isRequired,
  profilePic: string.isRequired,
  error: string
};

export default ProfileDropzone;
