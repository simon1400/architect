import React, { Component } from 'react'
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';

class News extends Component {

  render() {
    let childElements,
        url = this.props.match.path.substring(1);

    if(this.props.articles.length > 0){
      let articles = this.props.articles.filter(article => article.parentPage == url ? article : null)
      childElements = articles.map((item, index) => {
         return [
            <div key={`${index}_A`} className="col s12">
              <Slider items={item}/>
          </div>,
            <div key={`${index}_B`} className="col s6 offset-s3">
              <h2>{item.title}</h2>
              {item.content ? renderHTML(item.content) : ''}
            </div>
          ];
      });
    }



    return (
      <div className="news row">
        {childElements}
      </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(News);
