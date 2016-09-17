import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../actions/animalActions';
import AnimalForm from '../components/animals/AnimalForm';
import '../styles/animal-form.scss';
import * as valid from '../util/validateForm';
import Spinner from 'react-spinkit';

class NewAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      animal: {
        chip_num: '',
        species_id: '',
        sex: '',
        admission_date: '',
        name: '',
        birthdate: '',
        race: '',
        death_date: '',
        castrated: false,
        vaccines: false,
        profile_image: ''
      },
      errors: {
        chip_num: '',
        species_id: '',
        sex: '',
        admission_date: '',
        name: '',
        birthdate: '',
        race: '',
        death_date: '',
        castrated: '',
        vaccines: '',
        profile_image: ''
      },
      requiredFields: {
        chip_num: false,
        species_id: true,
        sex: true,
        admission_date: true,
        name: true,
        birthdate: true,
        race: false,
        death_date: false,
        castrated: false,
        vaccines: false,
        profile_image: true
      },
      loading: true,
      images: [],
      profilePic: {},
      processedImage: {}
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
    this.setState({ loading: false });
    if (nextProps.success) {
      this.onClose();
    }
/*    if ( nextProps.success ) {
      this.props.actions.sendProfilePic(this.state.processedImage);
    } else {
      this.setState({ loading: false });
    }*/
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

  onClose() {
    this.props.actions.cancelAnimalForm();
    this.props.onClose();
  }

  onDrop(images) {
    this.setState({
      images: images
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
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
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

    return (
      <div>
        { this.state.loading ? loadingView : body }
      </div>
    );
  }
}

const { object, array, func, bool } = PropTypes;

NewAnimalModal.propTypes = {
  errors: object.isRequired,
  success: bool.isRequired,
  onClose: func.isRequired,
  species: array.isRequired,
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
    success: state.animalForm.success
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(NewAnimalModal);
