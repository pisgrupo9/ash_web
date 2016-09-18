import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import AnimalForm from '../components/animals/AnimalForm';
import '../styles/animal-form.scss';
import * as valid from '../util/validateForm';
import Spinner from 'react-spinkit';
import { toastr } from 'react-redux-toastr';

class EditAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      animal: {
        sex: '',
        admission_date: '',
        birthdate: '',
        race: '',
        death_date: '',
        castrated: false,
        vaccines: false
      },
      errors: {
        sex: '',
        admission_date: '',
        birthdate: '',
        race: '',
        death_date: '',
        castrated: '',
        vaccines: ''
      },
      requiredFields: {
        sex: true,
        admission_date: true,
        birthdate: true,
        race: false,
        death_date: false,
        castrated: false,
        vaccines: false
      },
      loading: true,
 
      profilePic: {}
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.onDropProfile = this.onDropProfile.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadSpecies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
        toastr.success('', 'Nuevo animal creado con exito');
        this.onClose();
    } 
  }

  validateForm(animal) {
    let errors = this.state.errors;
    for (let name in animal) {
      if (this.state.requiredFields[name]) {
        errors[name] = valid.validateEmptyField(name, animal[name]);
      }
    }
    this.setState({ errors });
  }

  onSubmit(e) {
    e.preventDefault();
    this.validateForm(this.state.animal);
    if (valid.notErrors(this.state.errors)) {
      this.setState({ loading: true });
      this.props.actions.sendAnimalForm(this.state.animal);
    }
  }

  onChange(e) {
    const field = e.target.name;
    const checkbox = field === 'castrated' || field === 'vaccines';
    const value = checkbox ? e.target.checked : e.target.value;
    let animal = this.state.animal;
    animal[ field ] = value;
    this.setState({ animal });
    if (this.state.requiredFields[ field ]) {
      let errors = this.state.errors;
      errors[field] = valid.validateEmptyField(field, value);
      this.setState({ errors: errors });
    }
  }

  onClose() {
    this.props.actions.cancelAnimalForm();
    this.props.onClose();
  }

  render() {
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const loadingImagesView = (<div className="loading-container">
                                <span className="loading-text">Cargando imagenes </span>
                                <div className="loading-images">
                                  <i className="material-icons loading-icon">pets</i>
                                </div>
                              </div>);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> INGRESO DE ANIMALES </h2>
                    <AnimalForm animal={this.state.animal}
                                species={this.props.species}
                                images={this.state.images}
                                profilePic={this.state.profilePic}
                                onSave={this.onSubmit}
                                onChange={this.onChange}
                                onCancel={this.onClose}
                                onDrop={this.onDrop}
                                onDelete={this.onDeleteImage}
                                onDropProfile={this.onDropProfile}
                                errors={localErrors ? this.state.errors : this.props.errors}
                                />
                  </div>);

    const getView = () => {
      if (this.state.uploading_images) {
        return loadingImagesView;
      } else if (this.state.loading) {
        return loadingView;
      } else {
        return body;
      }
    };

    return (
      <div>
        { getView() }
      </div>
    );
  }
}

const { object, array, func, bool, string, number } = PropTypes;

EditAnimalModal.propTypes = {
  errors: object.isRequired,
  success: bool.isRequired,
  onClose: func.isRequired,
  species: array.isRequired,
  id: string.isRequired,
  sended_images: number.isRequired,
  actions: object.isRequired
};

const mapState = (state) => {
  const errors = {};
  for (let error in state.animalForm.errors) {
    errors[error] = state.animalForm.errors[error][0];
  }

  return {
    species: state.species,
    errors: errors,
    success: state.animalForm.success,
    success_image: state.animalForm.success_image,
    sended_images: state.animalForm.sended_images,
    id: state.animalForm.id.toString()
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAnimalModal);
