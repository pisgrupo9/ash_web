import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import * as confirmActions from '../actions/confirmActions';
import * as exportActions from '../actions/exportActions';
import InfoPerfil from '../components/animals/InfoPerfil';
import ImagesGallery from '../components/animals/ImagesGallery';
import AddGalleryButton from '../components/animals/AddGalleryButton';
import AnimalEventWrapper from '../components/animals/events/AnimalEventWrapper';
import '../styles/animal-perfil.scss';
import { toastr } from 'react-redux-toastr';
import '../styles/animal-form.scss';
import * as util from '../util/validateForm';
import * as message from '../constants/apiMessage';
import { StickyContainer } from 'react-sticky';

class AnimalPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loading_gallery: true,
      image_page: 1,
      more_page: true,
      edit_gallery: false,
      pdfUrl: null,
      pdfStart: true,
      animalId: null
    };

    this.loading = this.loading.bind(this);
    this.onMoreImages = this.onMoreImages.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);
    this.editGallery = this.editGallery.bind(this);
    this.exportPerfil = this.exportPerfil.bind(this);
  }

  componentWillMount() {
    let animalId = this.props.routeParams.id;
    this.props.animalActions.showPerfilAnimal(animalId);
    this.props.animalActions.showPerfilAnimalImages(animalId, 1);
    this.setState({ pdfUrl: null, animalId: animalId, image_page: 1 });
  }

  componentWillReceiveProps(nextProps) {
    const { image_page, animalId } = this.state;
    const { animal, exportUrl, animalImages } = this.props;
    if (nextProps.animal.name) {
      this.setState({ loading: false });
    }
    if (nextProps.animal != animal) {
      this.setState({ pdfUrl: null, pdfStart: true });
    }
    if (nextProps.animalImages.images!= animalImages.images) {
      let moreImages = (nextProps.animalImages.total_pages > image_page);
      this.setState({ loading_gallery: false, more_page: moreImages });
      if (!nextProps.animalImages.images.length) {
        this.setState({ edit_gallery: false });
      }
    }
    if (nextProps.animalImages.uplaodImages) {
      this.setState({ loading_gallery: true, image_page: 1 });
    }
    if (nextProps.animalImages.removeImages) {
      this.setState({ loading_gallery: false });
    }
    if (nextProps.animalImages.error) {
      toastr.error('ERROR', nextProps.animalImages.error);
      this.setState({ loading_gallery: true });
    }
    if (nextProps.exportUrl.urlPdf != exportUrl.urlPdf & nextProps.exportUrl.animalId == animalId) {
      this.setState({ pdfUrl: nextProps.exportUrl.urlPdf });
    }
  }

  loading() {
    this.setState({ loading: true });
  }

  editGallery() {
    const { edit_gallery } = this.state;
    const { images } = this.props.animalImages;
    if (images.length) {
      this.setState({ edit_gallery: !edit_gallery });
    } else {
      this.setState({ edit_gallery: false });
    }
  }

  onRemoveImage(image) {
    const confirmf = () => {
      this.props.animalActions.removePerfilAnimalImages(this.props.animal.id, image.id);
      this.setState({ loading_gallery: true });
    };
    this.props.confirmActions.confirmDialog({
                  title: message.REMOVE_IMAGE_TITLE,
                  message: message.REMOVE_IMAGE_MESSAGE,
                  confirmF: confirmf
                });
  }

  onMoreImages() {
    const { image_page } = this.state;
    let newPage = image_page+1;
    this.props.animalActions.showPerfilAnimalImages(this.props.animal.id, newPage);
    this.setState({ image_page: newPage });
  }

  exportPerfil() {
    let { pdfUrl, pdfStart, animalId } = this.state;
    if ( pdfUrl ) {
      toastr.warning('', message.FICHA_YA_CREADA);
    } else if (pdfStart) {
      this.props.exportActions.exportAnimal(animalId);
      this.setState({ pdfStart: false });
    }
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
    const { permissions } = this.props.user;
    const { id } = this.props.routeParams;
    const showButton = util.editAnimalPerfil(permissions);
    const { animal, animalImages } = this.props;
    const { loading, loading_gallery, edit_gallery } = this.state;
    return (
      <div className="profile-page-flex">
        <StickyContainer className="perfil-div">
          <div className="h-100">
            <InfoPerfil styleClass="info-div profile-section"
                          loading={loading}
                          animal={animal}
                          animalId={id}
                          loadingfunc={this.loading}
                          exportPerfil={this.exportPerfil}/>
          </div>
        </StickyContainer>
        <div className="other-section">
        <div className="gallery-div">
            <div className="gallery-buttons">
              <p className="section-title center">GALERÍA</p>
              <AddGalleryButton animalId={this.props.routeParams.id} disabled={edit_gallery}/>
              { showButton &&
              <button className={edit_gallery ? 'button-edit-galery active' : 'button-edit-galery'} onClick={this.editGallery}>
                <i className="material-icons">mode_edit</i>
              </button>
              }
            </div>
            <ImagesGallery images={animalImages.images}
                            styleClass="slick-container"
                            onMoreImages={this.onMoreImages}
                            moreImages={this.state.more_page}
                            loading={loading_gallery}
                            edit={edit_gallery}
                            onChangeRemove={this.onRemoveImage}
                            />
          </div>
          <div className="event-div">
            <AnimalEventWrapper animalId={id} />
          </div>
        </div>
      </div>
    );
  }
}

const { object } = PropTypes;

AnimalPerfilPage.propTypes = {
  animal: object.isRequired,
  animalImages: object.isRequired,
  user: object.isRequired,
  exportUrl: object.isRequired,
  animalActions: object.isRequired,
  confirmActions: object.isRequired,
  exportActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => {
  return {
    animal: state.animal,
    user: state.user,
    exportUrl: state.exportUrl,
    animalImages: state.animalImages
  };
};

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch),
    confirmActions: bindActionCreators(confirmActions, dispatch),
    exportActions: bindActionCreators(exportActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);
