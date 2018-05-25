import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import {WOW} from "wowjs";

const data = (articles) => {

  let childElements;
  let urlImage = '',
      url = window.location.pathname.substring(1);
  if(articles.length > 0){
    var articles = articles
      .filter(article => article.parentPage == url && article.visible ? article : null)
      .sort((a, b) => {
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      });
    return childElements = articles.map((item, index) => {
      let firstImage = item.image[0]
      if(firstImage){
        urlImage = 'https://storage.googleapis.com/' + item.uniqID + '/' + firstImage.name;
      }

      let itemLink = item.link ? item.link : `/projects/${item._id}`
      let delay = `${index/3.5}s`
       return (
          <Col key={index} xs="6" sm="6" md="4" lg={item.column ? '6' : '3'}>
            <div data-wow-offset="50" data-wow-delay={delay} className={item.column ? 'square_wrap big wow fadeIn' : 'square_wrap wow fadeIn'}>
              <a href={item.withoutLink ? null : itemLink} className="home_item_wrap">
                <h2>{item.title}</h2>
                <div className="homeItem" style={{backgroundImage: `url('${urlImage}')`}}></div>
              </a>
            </div>
          </Col>
        );
    });
  }
}

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentDidMount() {
    const wow = new WOW();
    wow.init();
  }

  render() {
    return (
      <div className="homePage">
        <Row>
          {this.props.childElements}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { childElements: data(articles) };
}

export default connect(mapStateToProps, {})(Home);
