import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {

  render() {
    let childElements,
        urlImage = '',
        url = this.props.match.path.substring(1);
    if(this.props.articles.length > 0){
      let articles = this.props.articles.filter(article => article.parentPage == url ? article : null)
      childElements = articles.map((item, index) => {
        let firstImage = item.image[0]
        if(firstImage){
          urlImage = '/images/' + item.uniqID + '/' + firstImage.name;
        }
         return (
            <div key={index} className={`col s12 m4 ${item.column ? 'l6' : 'l3'}`}>
              <a href={`/projects/${item._id}`} className="home_item_wrap">
                <h2>{item.title}</h2>
              <div className="homeItem" style={{backgroundImage: `url('${urlImage}')`}}></div>
              </a>
            </div>
          );
      });
    }


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
