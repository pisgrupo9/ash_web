import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as messages from '../../constants/apiMessage';
import * as animalActions from '../../actions/animalActions';
import AnimalForm from '../../components/animals/AnimalForm';
import '../../styles/animal-form.scss';
import * as valid from '../../util/validateForm';
import Spinner from 'react-spinkit';
import UploadImageMessage from '../../components/common/UploadImageMessage';
import { toastr } from 'react-redux-toastr';

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
        profile_image: '',
        weight: ''
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
        profile_image: '',
        weight: ''
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
      loading: true,
      images_to_send: 0,
      uploading_images: false,
      success_uploading_images: true,
      images: [],
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
      this.setState({ uploading_images: true });
      if (this.state.images.length === 0) {
        this.props.actions.loadAnimals(15, 1);
        toastr.success('', messages.SUCCES_CREATE_ANIMAL);
        this.onClose();
      } else if (this.state.images_to_send) {
        let success_upload = this.state.success_uploading_images;
        let noMoreImages = nextProps.sended_images === this.state.images_to_send;
        if (!nextProps.success_image) {
          success_upload = false;
          this.setState({ success_uploading_images: false });
        }
        if (noMoreImages) {
          this.props.actions.loadAnimals(15, 1);
          if (success_upload) {
            toastr.success('', messages.SUCCES_CREATE_ANIMAL);
            let cantImgs = this.state.images.length;
            toastr.info('Galeria', messages.GALLERY_ADD_IMAGEN(cantImgs));
          } else {
            toastr.error('Galeria', messages.GALLERY_LOAD_ERROR);
          }
          this.onClose();
        }
      } else {
        this.sendImages();
      }
    } else if (!this.state.uploading_images) {
      this.setState({ loading: false });
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
    if (this.isNegativeWeight(field, value)) return;
    let animal = this.state.animal;
    animal[ field ] = value;
    this.setState({ animal });
    if (this.state.requiredFields[ field ]) {
      let errors = this.state.errors;
      errors[field] = valid.validateEmptyField(value);
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
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const loadingImagesView = (<UploadImageMessage />);
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

NewAnimalModal.propTypes = {
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

export default connect(mapState, mapDispatch)(NewAnimalModal);
