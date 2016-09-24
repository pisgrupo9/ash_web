import React, { Component, PropTypes } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import '../../styles/img-galeria.scss';
import Spinner from '../common/SpinnerComponet';

class ImagesGallery extends Component {
  constructor(props, context) {
    super(props, context);
    this.state ={
        sliderPos: 0,
        removeImage: []
      };

    this.removeImage = this.removeImage.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.edit) {
      this.setState({
            removeImage: []
          });
    }
  }

  removeImage(index, imgUrl) {
    const { removeImage } = this.state;
    removeImage[index] = true;
    if (this.props.onChangeRemove) {
      this.props.onChangeRemove(imgUrl, index);
    }
    this.setState({ removeImage });
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
    const { images, styleClass, edit, rest } = this.props;
    let pos = rest ? 0 : undefined;
    let settings = {
        infinite: false,
        centerMode: false,
        variableWidth: false,
        lazyLoad: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        className: 'carouselSlider',
        afterChange: this.nextPage,
        speed: 800,
        slickGoTo: pos,
        responsive: [
                       {
                        breakpoint: 400,
                        settings: { slidesToShow: 2, slidesToScroll: 1 }
                       },
                      {
                        breakpoint: 768,
                        settings: { slidesToShow: 2, slidesToScroll: 1 }
                       },
                       {
                        breakpoint: 992,
                          settings: { slidesToShow: 5, slidesToScroll: 2 }
                        },
                        {
                          breakpoint: 10000,
                          settings: { slidesToShow: 7, slidesToScroll: 3 }
                        }
                    ]
    };
    let imageList = [];
    for (let i = 0; images && i < images.length; i++) {
      if (!this.state.removeImage[i])
          imageList.push(
                        <div key={'div'+i} className="img-container" >
                          <img className="img-galery" src={images[i].thumb} />
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
    const galleryView = () => {
      if (imageList.length > 0) {
        return (
          <Slider {...settings}>
            {imageList}
          </Slider>
        );
      }
    };

    return (
      <div className={styleClass}>
        { this.props.loading ? (<Spinner active={this.props.loading} />) : galleryView() }
      </div>
    );
  }
}

const { array, string, bool, func } = PropTypes;

ImagesGallery.propTypes = {
  images: array.isRequired,
  styleClass: string,
  edit: bool,
  loading: bool.isRequired,
  onMoreImages: func,
  onChangeRemove: func,
  moreImages: bool.isRequired,
  rest: bool
};

export default ImagesGallery;
