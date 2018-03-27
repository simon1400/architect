import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    let childElements = this.props.articles.map((item, index) => {
      let firstImage = item.image[0]
      let url = '/images/' + item.uniqID + '/' + firstImage.name;
       return (
          <div key={index} className="col s3">
            <a href={`/project/${item._id}`} className="home_item_wrap">
              <h2>{item.title}</h2>
              <div className="homeItem" style={{backgroundImage: `url('${url}')`}}></div>
            </a>
          </div>
        );
    });

    return (
      <div className="homePage row">
        {childElements}
      </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Home);
