import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import '../../styles/img-galeria.scss';
import Spinner from '../common/SpinnerComponent';
import Lightbox from 'react-images';

class ImagesGallery extends Component {
  constructor(props, context) {
    super(props, context);

    this.state ={
      sliderPos: 0,
      lightboxIsOpen: false,
      currentImage: 0
    };

    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  removeImage(index, image) {
    if (this.props.onChangeRemove)
      this.props.onChangeRemove(image, index);
  }

  openLightbox (index, event) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }

  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
    this.nextPage(this.state.currentImage);
  }

  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickImage () {
    if (this.state.currentImage === this.props.images.length - 1) return;
    this.gotoNext();
  }

  nextPage(newSlide) {
    const { images, moreImages, onMoreImages } = this.props;
    const { sliderPos } = this.state;
    if (((images.length-newSlide) < 10)
      && (sliderPos < newSlide)
      && moreImages) {
      onMoreImages();
    }
    this.setState({ sliderPos: newSlide });
  }

  render() {
    const prevArrow = (<button className="nav-button"><i className="material-icons">keyboard_arrow_left</i></button>);
    const nextArrow = (<button className="nav-button" onClick={this.nextPage}><i className="material-icons">keyboard_arrow_right</i></button>);
    const { images, styleClass, edit, loading } = this.props;

    const lightboxImages = images.map(({ url }) => ({
      src: url
    }));

    let settings = {
        infinite: false,
        centerMode: false,
        variableWidth: true,
        accessibility: false,
        lazyLoad: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        className: 'carouselSlider' + (loading ? ' hiden' : ''),
        afterChange: this.nextPage,
        speed: 800,
        responsive: [
                       {
                        breakpoint: 450,
                        settings: { slidesToShow: 2, slidesToScroll: 1 }
                       },
                      {
                        breakpoint: 600,
                        settings: { slidesToShow: 3, slidesToScroll: 1 }
                       },
                        {
                        breakpoint: 780,
                          settings: { slidesToShow: 4, slidesToScroll: 2 }
                        },
                       {
                        breakpoint: 992,
                          settings: { slidesToShow: 5, slidesToScroll: 2 }
                        },
                        {
                          breakpoint: 1325,
                          settings: { slidesToShow: 7, slidesToScroll: 3 }
                        },
                        {
                          breakpoint: 1475,
                          settings: { slidesToShow: 8, slidesToScroll: 3 }
                        },
                        {
                          breakpoint: 1625,
                          settings: { slidesToShow: 9, slidesToScroll: 3 }
                        },
                        {
                          breakpoint: 1775,
                          settings: { slidesToShow: 10, slidesToScroll: 3 }
                        },
                        {
                          breakpoint: 10000,
                          settings: { slidesToShow: 11, slidesToScroll: 3 }
                        }
                    ]
    };
    let imageList = [];

    for (let i = 0; images && i < images.length; i++) {
        imageList.push(
                      <div key={'div'+i} className="img-container" >
                        <a onClick={(e) => this.openLightbox(i, e)} >
                          <img className="img-galery" src={images[i].thumb} />
                        </a>
                          {edit &&
                            <button
                              className="btn-img-remove"
                              onClick={() => {
                                 this.removeImage(i, images[i]);
                                }
                              }
                            >
                            <i className="material-icons">clear</i>
                            </button>
                          }
                      </div>
                      );
    }

    let galleryView = () => {
      if (!imageList.length) {
        return (
          <div className="empty-gallery-container">
            <p> No hay fotos para mostrar </p>
          </div>
        );
      } else {
        return (
          <Slider {...settings}>
            {imageList}
          </Slider>
        );
      }
    };

    return (
      <div className={styleClass}>
        { loading ? (<Spinner active={loading} />) : galleryView() }
        <Lightbox
          currentImage={this.state.currentImage}
          images={lightboxImages}
          isOpen={this.state.lightboxIsOpen}
          onClickImage={this.handleClickImage}
          onClickNext={this.gotoNext}
          onClickPrev={this.gotoPrevious}
          onClose={this.closeLightbox}
          showImageCount={false}
          backdropClosesModal={true}
        />
      </div>
    );
  }
}

const { array, string, bool, func } = PropTypes;

ImagesGallery.propTypes = {
  images: array,
  styleClass: string,
  edit: bool,
  loading: bool.isRequired,
  onMoreImages: func,
  onChangeRemove: func,
  moreImages: bool.isRequired
};

export default ImagesGallery;
