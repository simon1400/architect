import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'

function NextArrow(props) {
  return <i onClick={props.onClick} className="sliderIcon sl_right fas fa-chevron-right"></i>
}

function PrevArrow(props) {
  return <i onClick={props.onClick} className="sliderIcon sl_left fas fa-chevron-left"></i>
}

class SliderEl extends Component {

  render() {
    let settings = {
      dots: false,
      accessibility: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    let renderImage, height, sliderItems = this.props.items

    if(sliderItems.image){
      renderImage = sliderItems.image.map((item, index) =>
        <div
          key={index}
          className="projectSlide"
          style={{
            backgroundImage: `url('https://storage.googleapis.com/${sliderItems.uniqID}/${item.name}')`
          }}
          >
        </div>
      )
    }

    return(
      <Slider {...settings}>
        {renderImage}
      </Slider>
    )
  }
}


export default SliderEl;
