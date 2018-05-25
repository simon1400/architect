import React, { Component } from 'react'
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';
import { Row, Col } from 'reactstrap'

class News extends Component {

  render() {
    let childElements,
        url = this.props.match.path.substring(1);

    if(this.props.articles.length > 0){
      let articles = this.props.articles.filter(article => article.parentPage == url ? article : null)
      articles.sort((a, b) => {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      });
      childElements = articles.map((item, index) => {
         return (
           <Row key={index} className="newsItem">
              <Col sm="12">
                <Slider items={item}/>
              </Col>
                <Col sm="12" md="12" lg={{size: 6, offset: 3}}>
                  <h1>{item.title}</h1>
                  {item.content ? renderHTML(item.content) : ''}
              </Col>
            </Row>
          );
      });
    }

    return (
        <div className="news">
          {childElements}
        </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(News);
