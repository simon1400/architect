import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick'
import renderHTML from 'react-render-html';

class Project extends Component {

  state = {
    projectItem: []
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.articles.map(item => {
      if(item._id === this.props.match.params.id){
        this.setState({
          projectItem: item
        })
      }
    })
  }

  render() {

    this.props.articles.map(item => {
        if(item._id == this.props.match.params.id){

          return;
        }
    })

    let settings = {
      dots: false,
      accessibility: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };

    let projectItem = this.state.projectItem

    let renderImage

    if(projectItem.image){
      renderImage = projectItem.image.map((item, index) =>
        <div
          key={index}
          className="projectSlide"
          style={{backgroundImage: `url('/images/${projectItem.uniqID}/${item.name}')`}}>
        </div>
      )
    }


    return(
      <div className="project">
        <div className="row">
          <div className="col s6">
            <Slider {...settings}>
              {renderImage}
            </Slider>
          </div>
          <div className="col s6">
            <h1>{projectItem.title}</h1>
            {projectItem.content ? renderHTML(projectItem.content) : ''}
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Project);
