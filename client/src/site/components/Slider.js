import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import renderHTML from 'react-render-html';

class SliderEl extends Component {
  render() {
    let settings = {
      dots: false,
      accessibility: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let renderImage, sliderItems = this.props.items

    if(sliderItems.image){
      renderImage = sliderItems.image.map((item, index) =>
        <div
          key={index}
          className="projectSlide"
          style={{backgroundImage: `url('/images/${sliderItems.uniqID}/${item.name}')`}}>
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
