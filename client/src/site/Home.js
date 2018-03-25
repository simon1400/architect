import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

import image from './img/Снимок экрана 2018-03-14 в 21.21.29.png'

class Home extends Component {

  componentDidMount() {
    this.props.getData();
  }

  renderArticles() {
    return this.props.articles.map((item, index) => {
      let firstImage = item.image[0]
      console.log(image);
      return <div
        className="col s3 homeItem"
        style={{backgroundImage: `url(/static/media/Снимок экрана 2018-03-14 в 21.21.29.45526714.png)`}}
        key={index}>
        {item.title}
      </div>
    })
  }

  render() {
    return(
      <div className="homePage row">
        {this.renderArticles()}
      </div>
    )
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, actions)(Home);
