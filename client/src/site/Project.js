import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';
import { Row, Col } from 'reactstrap'

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

    let projectItem = this.state.projectItem

    return(
      <div className="project">
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
    )
  }

}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Project);
