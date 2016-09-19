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
      loading_gallery: true,
      edit: false,
      animal: {
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: false,
        vaccines: false
      }
    };

    this.edit = this.edit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
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
    let animal = Object.assign({}, this.state.animal, nextProps.animal);
    this.setState({ animal: animal });
  }

  edit() {
   this.setState({ edit: true });
  }

  onClose() {
    let animal = Object.assign({}, this.state.animal, this.props.animal);
    this.setState({ animal: animal, edit: false });
  }

  onSubmit() {
    this.props.animalActions.editAnimal(this.props.routeParams.id, this.state.animal);
    this.setState({ edit: false });
  }

  onChange(e) {
    const field = e.target.name;
    const booleanValue = field === 'vaccines' || field === 'castrated';
    const value = booleanValue ? (e.target.value === 'true' ? true : false) : e.target.value;
    let animal = this.state.animal;
    animal[ field ] = value;
    this.setState({ animal: animal });
  }

  render() {
    const { animal } = this.props;
    return (
      <div className="profile-page-flex">
       <InfoPerfil styleClass="perfil-div info-div profile-section"
                      loading={this.state.loading}
                      animal={this.state.edit ? this.state.animal : this.props.animal}
                      edit={this.edit}
                      editState={this.state}
                      onSave={this.onSubmit}
                      onChange={this.onChange}
                      onCancel={this.onClose}/>
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
