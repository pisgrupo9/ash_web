import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';
import ImagesGallery from '../components/animals/ImagesGallery';
import AddGalleryButton from '../components/animals/AddGalleryButton';
import { Modal, Button } from 'react-bootstrap';
import EditAnimalModal from './EditAnimalModal';
import '../styles/animal-perfil.scss';
import { toastr } from 'react-redux-toastr';
import '../styles/animal-form.scss';

class AnimalPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      loading: true,
      loading_gallery: true,
      image_page: 1,
      more_page: true,
      edit_gallery: false
    };

    this.onMoreImages = this.onMoreImages.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.editGallery = this.editGallery.bind(this);
  }

  componentWillMount() {
    this.props.animalActions.showPerfilAnimal(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    const { edit_gallery, image_page } = this.state;
    if (nextProps.animal.name) {
      this.setState({ loading: false });
    }
    if (nextProps.animal.images) {
      let moreImages = edit_gallery || (nextProps.animal.images.length >= (15 * image_page));
      this.setState({ loading_gallery: false, more_page: moreImages });
    }
    if (nextProps.animal.uplaodImages) {
      this.setState({ loading_gallery: true, image_page: 1 });
    }
    if (nextProps.animal.removeImages) {
      this.setState({ loading_gallery: false });
    }
    if (nextProps.animal.error) {
      toastr.error('ERROR', nextProps.animal.error);
    }
    let animal = Object.assign({}, this.state.animal, nextProps.animal);
    this.setState({ animal: animal });
  }

  onOpen() {
    this.setState({ showModal: true });
  }

  onClose() {
    let animal = Object.assign({}, this.state.animal, this.props.animal);
    this.setState({ animal: animal, showModal: false });
  }

  onSubmit() {
    this.props.animalActions.editAnimal(this.props.routeParams.id, this.state.animal);
    this.setState({ loading: true });
    this.onClose();
  }

  onChange(e) {
    const field = e.target.name;
    const booleanValue = field === 'vaccines' || field === 'castrated';
    const value = booleanValue ? (e.target.value === 'true' ? true : false) : e.target.value;
    let animal = this.state.animal;
    animal[ field ] = value;
    this.setState({ animal: animal });
  }

  editGallery() {
    const { edit_gallery } = this.state;
    this.setState({ edit_gallery: !edit_gallery });
  }

  onRemoveImage(image) {
    this.props.animalActions.removePerfilAnimalImages(this.props.animal.id, image.id);
    this.setState({ loading_gallery: true });
  }

  onMoreImages() {
    const { image_page } = this.state;
    let newPage = image_page+1;
    this.props.animalActions.showPerfilAnimalImages(this.props.animal.id, newPage);
    this.setState({ image_page: newPage });
  }

  onDropProfile(img) {
    const reader = new FileReader();
    const file = img[0];
    this.setState({ profilePic: file });
    reader.readAsDataURL(file);
    reader.onload = (upload) => {
      let animal = this.state.animal;
      animal["profile_image"] = upload.target.result;
      this.setState({ animal });
    };
  }

  render() {
    const showButton = this.props.user.permissions === 'animals_edit' || 'super_user';
    const { animal } = this.props;
    const { loading, loading_gallery, edit_gallery } = this.state;
    return (
      <div className="profile-page-flex">
        <div className="perfil-div">
          <InfoPerfil styleClass="info-div profile-section"
                        loading={this.state.loading}
                        animal={this.props.animal}/>
          <div className="edit-button">
            <Button className="button-animal" onClick={this.onOpen}>
              <i className="material-icons">mode_edit</i>
            </Button>
          </div>
          <Modal show={this.state.showModal} onHide={this.onClose} bsSize="large">
            <EditAnimalModal animal={this.state.animal}
                              onChange={this.onChange}
                              onSave={this.onSubmit}
                              onClose={this.onClose}
                              showModal={this.state.showModal}
                              onDrop={this.onDropProfile}
                              profilePic={this.state.profilePic}/>
          </Modal>
        </div>
        <div className="events-gallery-section">
          <div className="event-div">
            <p className="title">EVENTOS</p>
          </div>
          <div className="gallery-div">
            <div className="gallery-buttons">
              <p className="title center">GALERÍA</p>
              <AddGalleryButton animalId={this.props.routeParams.id} disabled={edit_gallery}/>
              { showButton &&
              <button className={edit_gallery ? 'button-edit-galery active' : 'button-edit-galery'} onClick={this.editGallery}>
                <i className="material-icons">mode_edit</i>
              </button>
              }
            </div>
            { animal.images &&
            <ImagesGallery images={animal.images}
                            styleClass="slick-container"
                            onMoreImages={this.onMoreImages}
                            moreImages={this.state.more_page}
                            loading={loading_gallery}
                            edit={edit_gallery}
                            onChangeRemove={this.onRemoveImage}
                            />
            }
          </div>
        </div>
      </div>
    );
  }
}

const { object } = PropTypes;

AnimalPerfilPage.propTypes = {
  animal: object.isRequired,
  user: object.isRequired,
  animalActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => ({
  animal: state.animal,
  user: state.user
});

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);
