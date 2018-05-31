import React, {Component} from 'react'
import {connect} from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';
import {Row, Col} from 'reactstrap'

class Contacts extends Component {

  render() {
    let childElements,
      url = this.props.match.path.substring(1);

    if (this.props.articles.length > 0) {
      let articles = this.props.articles.filter(
        article => article.parentPage == url
        ? article
        : null)
      articles.sort((a, b) => {
        if (a.index > b.index)
          return 1;
        if (a.index < b.index)
          return -1;
        return 0;
      });
      childElements = articles.map((item, index) => {
        return (
          <Col key={item.uniqID} sm="12" md="6" lg="6">
            <Slider items={item}/>
          <h1>{item.title}</h1>
            {
              item.content
                ? renderHTML(item.content)
                : ''
            }
          </Col>);
      });
    }

    return (
      <Row className="contacts" uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 300; repeat: true">
        {childElements}
      </Row>
    );
  }
}

function mapStateToProps({articles}) {
  return {articles};
}

export default connect(mapStateToProps, {})(Contacts);
