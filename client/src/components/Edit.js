import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { EditorState, CompositeDecorator } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import Field from './Filed'
import Editor from './Editor/Editor'
import DragDrop from './DragDrop'
import '../styles/Edit.css'

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Link = (props) => {
  const { url } = props.contentState
    .getEntity(props.entityKey).getData();

  return (
    <a href={url} title={url} className="ed-link">
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link
  }
]);

class Edit extends Component {

  state = {
    title: '',
    image: [],
    uniqID: '',
    editorState: EditorState.createEmpty(decorator)
  }

  componentDidMount = () => {
    this.setState({
      uniqID: Math.random().toString(36).substr(2, 9)
    })
  }

  changeEditor = (editorState) => {
    this.setState({editorState: editorState})
  }

  changeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

	onDrop = (files) => {
    let image = []
    files.map((file, index) => {
      return image = [
        ...image,
        {
          file: file,
          preview: file.preview,
          name: file.name
        }
      ]
    })
    this.setState(prevState => ({
      image: [...prevState.image, ...image]
    }))
  }

  short = image => this.setState({image})

  submit = () => {
    const content = stateToHTML(this.state.editorState.getCurrentContent());
    const data = {
      title: this.state.title,
      content
    }
    this.props.fetchData(this.state.uniqID, data, this.state.image)
  }

	render() {
		return(
			<div>
        <h3>Edit article</h3>
        <Field name="title" title="Zahlavi" onChange={this.changeTitle} placeholder="Clanek 1" value={this.state.title} type="text" />
				<DragDrop image={this.state.image} onDrop={this.onDrop} onShort={this.short}/>
        <Editor editorState={this.state.editorState} changeEditor={this.changeEditor}/>
        <button className="btn right waves-effect waves-light button_submit" onClick={this.submit}>
          Submit
          <i className="material-icons right">send</i>
        </button>
			</div>
		)
	}
}

function mapStateToProps({ edit }) {
  return { edit };
}

export default connect(mapStateToProps, actions)(Edit);
