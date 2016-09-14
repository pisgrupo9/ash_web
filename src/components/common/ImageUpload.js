import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import '../../styles/image-upload.scss';

class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
    debugger;
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  removeImagen() {
    this.setState({
        file: null,
        imagePreviewUrl: null
    });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        <div className="imgPreview">
          {$imagePreview}
          <form onSubmit={(e)=>this._handleSubmit(e)} className="image-form">
          {!imagePreviewUrl && <input className="fileInput" type="file" onChange={(e)=>this._handleImageChange(e)} />}
          {imagePreviewUrl && <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>}
          {imagePreviewUrl && <button className="submitButton" type="submit" onClick={()=>this.removeImagen()}>Remove Image</button>}
          </form>
        </div>
      </div>
    )
  }
}
  
const mapState = () => ({});

export default connect(mapState)(ImageUpload);
