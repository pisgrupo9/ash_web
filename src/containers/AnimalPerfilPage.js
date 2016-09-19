import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import InfoPerfil from '../components/animals/InfoPerfil';
import ImagesGallery from '../components/animals/ImagesGallery';
import AddGalleryButton from '../components/animals/AddGalleryButton';
import '../styles/animal-perfil.scss';

class AnimalPerfilPage extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loading: true,
      loading_gallery: true
    };
  }

  componentWillMount() {
    this.props.animalActions.showPerfilAnimal(this.props.routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.animal.name) {
      this.setState({ loading: false });
    }
    if (nextProps.animal.images) {
      this.setState({ loading_gallery: false });
    }
    if (nextProps.animal.uplaodImages) {
        this.setState({ loading_gallery: true });
    }
  }

  render() {
    const { animal } = this.props;
    return (
      <div className="profile-page-flex">
        <InfoPerfil animal={animal}
                    loading={this.state.loading}
                    styleClass="perfil-div info-div profile-section"/>
        <div className="events-gallery-section">
          <div className="event-div">
            <p>Proximamente Eventos</p>
          </div>
          <div className="gallery-div">
            <div className="gallery-buttons">
              <p className="center">Galería</p>
              <AddGalleryButton animalId={this.props.routeParams.id}/>
            </div>
            { animal.images &&
            <ImagesGallery images={animal.images}
                            loading={this.state.loading_gallery}
                            styleClass="slick-container"/>
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
  animalActions: object.isRequired,
  routeParams: object.isRequired
};

AnimalPerfilPage.contextTypes = {
  router: object
};

const mapState = (state) => ({
  animal: state.animal
});

const mapDispatch = (dispatch) => {
  return {
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AnimalPerfilPage);
