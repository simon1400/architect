import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';
import { Row, Col } from 'reactstrap'
import DocumentMeta from 'react-document-meta';

class Project extends Component {

  state = {
    projectItem: []
  }

  componentWillReceiveProps = (nextProps) => {
    nextProps.articles.map(item => {
      if(item._id === this.props.match.params.id){
        this.setState({
          projectItem: item
        })
      }
    })
  }

  render() {

    let projectItem = this.state.projectItem;

    const meta = {
      description: projectItem.description
    }

    return(
      <DocumentMeta {...meta}>
        <div className="project" uk-scrollspy="cls: uk-animation-slide-bottom-small; target: > div; delay: 300; repeat: false">
          <Row>
            <Col sm="12" md="6">
              <Slider items={projectItem}/>
            </Col>
            <Col sm="12" md="6">
              <h1>{projectItem.title}</h1>
              {projectItem.content ? renderHTML(projectItem.content) : ''}
            </Col>
          </Row>
        </div>
      </DocumentMeta>
    )
  }

}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Project);
