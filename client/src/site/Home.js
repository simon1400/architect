import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as actions from '../actions';

class Home extends Component {

  state = {
    childElements: this.props.article
  }

  componentDidMount() {
    this.props.getData();
  }

  componentWillReceiveProps(nextProps){
    var urlImage = '',
        url = window.location.pathname.substring(1);
    if(nextProps.articles.length > 0){
      var articles = nextProps.articles
        .filter(article => article.parentPage == url && article.visible ? article : null)
        .sort((a, b) => {
          if (a.index > b.index) return 1;
          if (a.index < b.index) return -1;
          return 0;
        });
      var childElements = articles.map((item, index) => {
        var firstImage = item.image[0]
        if(firstImage){
          urlImage = 'https://storage.googleapis.com/' + item.uniqID + '/' + firstImage.name;
        }

        let itemLink = item.link ? item.link : `/projects/${item._id}`
        // let delay = `${index/3.5}s` xs="6" sm="6" md="4" lg={item.column ? '6' : '3'}
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
      this.setState({ childElements })
    }
  }

  render() {
    return (
      <div className="homePage">
        <Row uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 300; repeat: false">
          {this.state.childElements}
        </Row>
      </div>
    );
  }
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, actions)(Home);
