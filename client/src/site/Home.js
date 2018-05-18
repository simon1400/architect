import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

class Home extends Component {

  render() {
    let childElements,
        urlImage = '',
        url = this.props.match.path.substring(1);
    if(this.props.articles.length > 0){
      let articles = this.props.articles
          .filter(article => article.parentPage == url && article.visible ? article : null)
          .sort((a, b) => {
      		  if (a.index > b.index) return 1;
      		  if (a.index < b.index) return -1;
      		  return 0;
      		});
      childElements = articles.map((item, index) => {
        let firstImage = item.image[0]
        if(firstImage){
          urlImage = 'https://storage.googleapis.com/' + item.uniqID + '/' + firstImage.name;
        }

        let itemLink = item.link ? item.link : `/projects/${item._id}`

         return (
            <Col key={index} xs="6" sm="6" md="4" lg={item.column ? '6' : '3'}>
              <div className={item.column ? 'square_wrap big' : 'square_wrap'}>
                <a href={item.withoutLink ? null : itemLink} className="home_item_wrap">
                  <h2>{item.title}</h2>
                  <div className="homeItem" style={{backgroundImage: `url('${urlImage}')`}}></div>
                </a>
              </div>
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
