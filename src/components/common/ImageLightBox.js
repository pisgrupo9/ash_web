import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';

class ImageLightBox extends Component {
  constructor(props, context) {
    super(props, context);

    this.state ={
      lightboxIsOpen: false
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
  }

  openLightbox (e) {
    e.preventDefault();
    this.setState({
      lightboxIsOpen: true,
    });
  }

  closeLightbox () {
    this.setState({
      lightboxIsOpen: false
    });
  }

  render() {
    const { imageStyle, imageSmall, imageFull } = this.props;
    const lightboxImage = [ { src: imageFull } ];

    return (
      <div>
        <a onClick={(e) => this.openLightbox(e)}>
          <img className={imageStyle} src={imageSmall}/>
        </a>
        <Lightbox images={lightboxImage}
                  isOpen={this.state.lightboxIsOpen}
                  onClose={this.closeLightbox}
                  showImageCount={false} />
      </div>
    );
  }
}

const { string } = PropTypes;

ImageLightBox.propTypes = {
  imageSmall: string.isRequired,
  imageFull: string.isRequired,
  imageStyle: string
};

export default ImageLightBox;
