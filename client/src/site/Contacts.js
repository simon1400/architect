import React, { Component } from 'react'
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';

class Contacts extends Component {

  render() {
    let childElements,
        url = this.props.match.path.substring(1);

    if(this.props.articles.length > 0){
      let articles = this.props.articles.filter(article => article.parentPage == url ? article : null)
      childElements = articles.map((item, index) => {
         return (
            <div key={item} className="col s12 m12 l6">
              <Slider items={item}/>
              <h2>{item.title}</h2>
              {item.content ? renderHTML(item.content) : ''}
            </div>
          );
      });
    }

    return (
      <div className="contacts row">
        {childElements}
      </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Contacts);
