import React, { Component } from 'react';
import Slider from 'react-slick'

function NextArrow(props) {
  return <img onClick={props.onClick} class="sliderIcon sl_right" src="/images/right.svg" alt="right" />
}

function PrevArrow(props) {
  return <img onClick={props.onClick} class="sliderIcon sl_left" src="/images/left.svg" alt="left" />
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
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

    let renderImage, sliderItems = this.props.items

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
