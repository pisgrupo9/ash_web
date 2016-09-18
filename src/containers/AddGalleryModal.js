import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import '../styles/animal-form.scss';
import ImagesDropzone from '../components/common/ImagesDropzone';
import ModalAnimalButtons from '../components/common/ModalAnimalButtons';
import { toastr } from 'react-redux-toastr';

class AddGalleryModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      images: [],
      images_to_send: 0,
      uploading_images: false,
      success_uploading_images: true,
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let success_upload = this.state.success_uploading_images;
    let noMoreImages = nextProps.sended_images === this.state.images_to_send;
    if (!nextProps.success_image) {
      success_upload = false;
      this.setState({ success_uploading_images: false });
    }
    if (noMoreImages) {
      this.props.actions.showPerfilAnimalImages(this.props.id);
      if (success_upload) {
        let cantImgs = this.state.images.length;
        toastr.info('Galeria', `Se agregaron ${cantImgs} nuevas fotos a la galeria`);
      } else {
        toastr.error('Galeria', 'Ocurrio un error al agregar las imagenes');
      }
      this.onClose();
    }
  }

  sendImages() {
    this.setState({
      images_to_send: this.state.images.length + this.props.sended_images
    });

    for (let image of this.state.images) {
      const reader = new FileReader();
      const file = image;
      reader.readAsDataURL(file);
      reader.onload = (upload) => {
        this.props.actions.uploadImageAnimal(upload.target.result, this.props.id);
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({ uploading_images: true });
    if (this.state.images.length > 0) {
      this.sendImages();
    }
  }

  onClose() {
    this.props.onClose();
  }

  onDrop(images) {
    let allImages = this.state.images.concat(images);
    this.setState({
      images: allImages,
    });
  }

  onDeleteImage(imageName) {
    let images = this.state.images;
    for (let i = 0; i < images.length; i++) {
      if (images[i].name == imageName) {
        images.splice(i, 1);
      }
    }
    this.setState({ images: images });
  }

  render() {
    const loadingImagesView = (<div className="loading-container">
                                <span className="loading-text">Cargando imagenes </span>
                                <div className="loading-images">
                                  <i className="material-icons loading-icon">pets</i>
                                </div>
                              </div>);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> AGREGAR IMAGENES </h2>
                    <ImagesDropzone title="Galeria"
                                    images={this.state.images}
                                    onDrop={this.onDrop}
                                    onDelete={this.onDeleteImage} />
                    <ModalAnimalButtons onSubmit={this.onSubmit} onClose={this.onClose} />
                  </div>);

    return (
      <div>
        { this.state.uploading_images ? loadingImagesView : body }
      </div>
    );
  }
}

const { object, func, string, number } = PropTypes;

AddGalleryModal.propTypes = {
  id: string.isRequired,
  sended_images: number.isRequired,
  onClose: func.isRequired,
  actions: object.isRequired
};

const mapState = (state) => ({
  success_image: state.animalForm.success_image,
  sended_images: state.animalForm.sended_images
});

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddGalleryModal);
