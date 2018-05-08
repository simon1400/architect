import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import renderHTML from 'react-render-html';

function NextArrow(props) {
  return <i onClick={props.onClick} className="sliderIcon sl_right fas fa-chevron-right"></i>
}

function PrevArrow(props) {
  return <i onClick={props.onClick} className="sliderIcon sl_left fas fa-chevron-left"></i>
}

class SliderEl extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: null
    }

    this.myBlock = React.createRef();
    this.updateDimensions = this.updateDimensions.bind(this)
  }

  updateDimensions() {
    this.setState({
      width: this.myBlock.current ? this.myBlock.current.offsetWidth : ''
    });
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

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

    let renderImage, height, sliderItems = this.props.items

    if(sliderItems.image){
      height = this.myBlock.current ? this.myBlock.current.offsetWidth : ''
      this.state.width ? height = this.state.width : null;
      renderImage = sliderItems.image.map((item, index) =>
        <div
          key={index}
          ref={this.myBlock}
          className="projectSlide"
          style={{
            backgroundImage: `url('https://storage.googleapis.com/${sliderItems.uniqID}/${item.name}')`,
            height: height
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
