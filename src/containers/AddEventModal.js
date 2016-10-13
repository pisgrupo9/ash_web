import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as eventActions from '../actions/eventActions';
import * as animalActions from '../actions/animalActions';
import * as valid from '../util/validateForm';
import Spinner from 'react-spinkit';
import UploadImageMessage from '../components/common/UploadImageMessage';
import '../styles/animal-form.scss';
import EventForm from '../components/animals/events/EventForm';
import { toastr } from 'react-redux-toastr';
import * as messages from '../constants/apiMessage';
import * as constants from '../constants/apiConstants';
import moment from 'moment';

class AddEventModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      event: {
        name: '',
        description: '',
        date: moment().format('YYYY-MM-DD')
      },
      errors: {
        name: '',
        description: '',
        date: ''
      },
      requiredFields: {
        name: true,
        description: false,
        date: true
      },
      loading: false,
      imagesToSend: 0,
      uploadingImages: false,
      successUploadingImages: true,
      images: [],
      windowWidth: window.innerWidth
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDeleteImage = this.onDeleteImage.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.success) {
      this.setState({ uploadingImages: true });
      if (this.state.images.length === 0) {
        toastr.success('', messages.SUCCES_CREATE_EVENT);
        let { animalId, filter } = this.props;
        this.props.actions.loadEvents(animalId, filter, constants.EVENT_PAGE_SIZE, 1);
        this.onClose();
      } else if (this.state.imagesToSend) {
        let successUpload = this.state.successUploadingImages;
        let noMoreImages = nextProps.sendedImages === this.state.imagesToSend;
        if (!nextProps.successImage) {
          successUpload = false;
          this.setState({ successUploadingImages: false });
        }
        if (noMoreImages) {
          this.props.animalActions.showPerfilAnimalImages(this.props.animalId, 1);
          if (successUpload) {
            toastr.success('', messages.SUCCES_CREATE_EVENT);
            let cantImgs = this.state.images.length;
            toastr.info('Galeria', messages.GALLERY_ADD_IMAGEN(cantImgs));
          } else {
            toastr.error('Galeria', messages.GALLERY_LOAD_ERROR);
          }
          let { animalId, filter } = this.props;
          this.props.actions.loadEvents(animalId, filter, constants.EVENT_PAGE_SIZE, 1);
          this.onClose();
        }
      } else {
        this.sendImages();
      }
    } else if (!this.state.uploadingImages) {
      this.setState({ loading: false });
    }
  }

  handleResize() {
    this.setState({ windowWidth: window.innerWidth });
  }

  sendImages() {
    this.setState({
      imagesToSend: this.state.images.length + this.props.sendedImages
    });
    for (let image of this.state.images) {
      const reader = new FileReader();
      const file = image;
      reader.readAsDataURL(file);
      reader.onload = (upload) => {
        this.props.actions.uploadImageEvent(upload.target.result, this.props.eventId, this.props.animalId);
      };
    }
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

  validateForm(event) {
    let errors = this.state.errors;
    for (let name in event) {
      if (this.state.requiredFields[name]) {
        errors[name] = valid.validateEmptyField(event[name]);
      }
    }
    this.setState({ errors });
  }

  onSubmit(e) {
    e.preventDefault();
    let { event, errors } = this.state;
    this.validateForm(event);
    if (valid.notErrors(errors)) {
      this.setState({ loading: true });
      this.props.actions.sendEventForm(event, this.props.animalId);
    }
  }

  onChange(e) {
    e.preventDefault();
    let { name, value } = e.target;
    let { event, requiredFields } = this.state;
    event[ name ] = value;
    this.setState({ event });
    if (requiredFields[ name ]) {
      let errors = this.state.errors;
      errors[ name ] = valid.validateEmptyField(value);
      this.setState({ errors: errors });
    }
  }

  handleDateChange(e) {
    let { event } = this.state;
    event.date = e.target.value;
    this.setState({ event: event });
    let errors = this.state.errors;
    errors.date = valid.validateEmptyField(event.date);
    this.setState({ errors: errors });
  }

  onClose() {
    this.props.actions.cancelEventForm();
    this.props.onClose();
  }

  render() {
    let { event, images, errors, windowWidth } = this.state;
    const localErrors = !valid.notErrors(this.state.errors);
    const loadingView = (<div className="loading-container">
                          <Spinner spinnerName="three-bounce" noFadeIn />
                        </div>);
    const loadingImagesView = (<UploadImageMessage />);
    const body = (<div className="animal-form-wrapper">
                    <h2 className="animal-form-title"> AGREGAR EVENTO </h2>
                      <EventForm event={event}
                                  images={images}
                                  onSave={this.onSubmit}
                                  onChange={this.onChange}
                                  onCancel={this.onClose}
                                  onDrop={this.onDrop}
                                  onDelete={this.onDeleteImage}
                                  onChangeDate={this.handleDateChange}
                                  errors={localErrors ? errors : this.props.errors}
                                  mobile={windowWidth < 450}
                                  />
                  </div>);

    const getView = () => {
      if (this.state.uploadingImages) {
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

const { object, func, string, bool, number } = PropTypes;

AddEventModal.propTypes = {
  errors: object.isRequired,
  success: bool.isRequired,
  onClose: func.isRequired,
  eventId: string.isRequired,
  sendedImages: number.isRequired,
  successImage: bool.isRequired,
  animalId: string.isRequired,
  filter: string.isRequired,
  actions: object.isRequired,
  animalActions: object.isRequired
};

const mapState = (state) => {
  const errors = {};
  for (let error in state.eventForm.errors) {
    errors[error] = state.eventForm.errors[error][0];
  }

  return {
    errors: errors,
    success: state.eventForm.success,
    successImage: state.eventForm.success_image,
    sendedImages: state.eventForm.sended_images,
    eventId: state.eventForm.id.toString(),
    filter: state.events.filter
  };
};

const mapDispatch = (dispatch) => {
  return {
    actions: bindActionCreators(eventActions, dispatch),
    animalActions: bindActionCreators(animalActions, dispatch)
  };
};

export default connect(mapState, mapDispatch)(AddEventModal);
