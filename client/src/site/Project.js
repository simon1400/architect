import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from './components/Slider'
import renderHTML from 'react-render-html';

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
        <div className="row">
          <div className="col s6">
            <Slider items={projectItem}/>
          </div>
          <div className="col s6">
            <h1>{projectItem.title}</h1>
            {projectItem.content ? renderHTML(projectItem.content) : ''}
          </div>
        </div>
      </div>
    )
  }

}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, {})(Project);
