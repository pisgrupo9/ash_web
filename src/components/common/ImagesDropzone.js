import React, { PropTypes, Component } from 'react';
import Dropzone from 'react-dropzone';
import ImagesPreview from './ImagesPreview';
import '../../styles/images-dropzone.scss';

class ImagesDropzone extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      click: false
    };

    this.onOpenClick = this.onOpenClick.bind(this);
  }

  onOpenClick() {
    const { click } = this.state;
    if (!click) {
      this.dropzone.open();
      this.setState({ click: true });
      const timeout = () => {
        this.setState({ click: false });
      };
      setTimeout( timeout, 1000);
    }
  }

  render() {
    const { images, title, onDrop, onDelete } = this.props;
    const ref = (node) => {
      this.dropzone = node;
    };
    return (
      <div className="dropzone-container">
        <p>{title}</p>
        <Dropzone className="dropzone"
                  activeClassName="dropzone-active"
                  accept="image/*"
                  ref={ref}
                  disableClick={true}
                  onDrop={onDrop}>
          <div className="click-div" onClick={this.onOpenClick}>
          <p className="dropzone-text">
            Arrastre las imágenes aquí o haga click para seleccionarlas manualmente
          </p>
          </div>
        </Dropzone>
        <ImagesPreview images={images} onDelete={onDelete}/>
      </div>
    );
  }
}

const { array, func, string } = PropTypes;

ImagesDropzone.propTypes = {
  title: string,
  images: array.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired
};

export default ImagesDropzone;
