import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

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
          urlImage = 'https://storage.googleapis.com/' + item.uniqID + '/' + firstImage.name;
        }
         return (
            <Col key={index} sm="12" md="4" lg={item.column ? '6' : '3'}>
              <a href={`/projects/${item._id}`} className="home_item_wrap">
                <h2>{item.title}</h2>
              <div className="homeItem" style={{backgroundImage: `url('${urlImage}')`}}></div>
              </a>
            </Col>
          );
      });
    }


    return (
      <Row className="homePage">
        {childElements}
      </Row>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Home);
