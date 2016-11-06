import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as animalActions from '../../actions/animalActions';
import AnimalEditForm from '../../components/animals/perfil/AnimalEditForm';
import * as valid from '../../util/validateForm';
import Spinner from 'react-spinkit';
import '../../styles/animal-perfil.scss';
import '../../styles/animal-form.scss';

class EditAnimalModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      profilePic: {},
      loading: false,
      animal: {
        chip_num: '',
        species_id: '',
        name: '',
        profile_image: '',
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: false,
        vaccines: false,
        weight: '',
      },
      modifiedFields: {
        chip_num: false,
        species_id: false,
        name: false,
        profile_image: false,
        sex: false,
        admission_date: false,
        birthdate: false,
        death_date: false,
        race: false,
        castrated: false,
        vaccines: false,
        weight: false
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
        profile_image: true,
        weight: false
      },
      errors: {
        chip_num: '',
        species_id: '',
        name: '',
        profile_image: '',
        sex: '',
        admission_date: '',
        birthdate: '',
        death_date: '',
        race: '',
        castrated: '',
        vaccines: ''
      }
    };
    this.validateForm = this.validateForm.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDropProfile = this.onDropProfile.bind(this);
  }

  componentWillMount() {
    this.props.animalActions.loadSpecies();
    this.setState({ loading: true });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.props.loading();
      this.onClose();
    }
    if (Object.keys(nextProps.errors).length === 0) {
      let animal = Object.assign({}, this.state.animal, this.props.animal);
      this.setState({ animal: animal });
    }
    this.setState({ loading: false });
  }

  componentWillUnmount() {
    this.props.animalActions.cancelAnimalForm();
  }

  onClose() {
    this.props.animalActions.cancelAnimalForm();
    this.props.onClose();
  }

  isDateType(name) {
    return name === 'death_date' || name === 'birthdate' || name === 'admission_date';
  }

  isNegativeWeight(name, value) {
    return name === 'weight' && value && value < 0;
  }

  validateForm(animal) {
    let { errors, requiredFields } = this.state;
    const death_or_addmission = (name) => {
      return name === 'death_date' || name === 'admission_date';
    };
    requiredFields.race = valid.requiredRace(animal.species_id);
    for (let name in animal) {
     if (requiredFields[name]) {
        errors[name] = valid.validateEmptyField(animal[name]);
      }
      if (animal[name] && this.isDateType(name)) {
        errors[name] = valid.lessThanToday(animal[name]);
        if (!errors.birthdate && !errors[name] && death_or_addmission(name)) {
          errors[name] = valid.compareDates(animal[name], animal.birthdate, 'Nacimiento');
        }
      } else if (!animal[name] && !requiredFields[name]) {
        errors[name] = '';
      }
    }
    this.setState({ errors });
  }

  onSubmit(e) {
    e.preventDefault();
    let { animal, errors } = this.state;
    this.validateForm(animal);
    if (valid.notErrors(errors)) {
      let animalNew = {};
      for (let name in animal) {
        if (this.state.modifiedFields[name]) {
          if (name == "sex") {
            const value = (animal[name] == "Macho" ? "male" : "female");
            animalNew[name] = value;
          } else {
            animalNew[name] = animal[name];
          }
        }
      }
      if (JSON.stringify(animalNew) != "{}") {
        this.props.animalActions.editAnimal(this.props.routeId, { animal: animalNew });
        this.setState({ loading: true });
      } else {
        this.onClose();
      }
    }
  }

  onChange(e) {
    const { modifiedFields, animal } = this.state;
    const field = e.target.name;
    const checkbox = field === 'vaccines' || field === 'castrated';
    const value = checkbox ? e.target.checked : e.target.value;
    if (this.isNegativeWeight(field, value)) return;
    animal[ field ] = value;
    modifiedFields[field] = true;
    this.setState({ animal, modifiedFields });
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
    const { modifiedFields } = this.state;
    modifiedFields["profile_image"] = true;
    this.setState({ modifiedFields });
  }

  render () {
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const body = (<div id="modal" className="animal-form-wrapper">
                    <h2 className="animal-form-title"> EDITAR ANIMALES </h2>
                    <AnimalEditForm animal={this.state.animal}
                                    species={this.props.species}
                                    profilePic={this.state.profilePic}
                                    onSave={this.onSubmit}
                                    onClose={this.onClose}
                                    onChange={this.onChange}
                                    onDropProfile={this.onDropProfile}
                                    errors={localErrors ? this.state.errors : this.props.errors}/>
                  </div>);
    const getView = () => {
      if (this.state.loading) {
        return loadingView;
      } else {
        return body;
      }
    };
    return (
      getView()
    );
  }
}

const { object, func, array, string } = PropTypes;

EditAnimalModal.propTypes = {
  errors: object.isRequired,
  species: array.isRequired,
  onClose: func.isRequired,
  animalActions: object.isRequired,
  animal: object.isRequired,
  routeId: string.isRequired,
  loading: func.isRequired
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
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(EditAnimalModal);
