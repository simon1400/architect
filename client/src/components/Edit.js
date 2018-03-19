import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { EditorState } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

import Editor from './Editor/Editor'
import DragDrop from './DragDrop'

class Edit extends Component {

  state = {
    title: '',
    image: [],
    uniqID: '',
    editorState: EditorState.createEmpty()
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

  short = (image) => {
    this.setState({image})
  }

  shortPhoto = (e) => {
    this.setState(prevState => ({
      namesImage: [...prevState.namesImage, e]
    }))
  }

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
				<label htmlFor="first_name">Zahlavi</label>
        <input placeholder="Clanek 1" name="title" onChange={(e) => this.changeTitle(e)} type="text" value={this.state.title} />
				<DragDrop image={this.state.image} onDrop={this.onDrop} onShort={this.short}/>
        <Editor editorState={this.state.editorState} changeEditor={this.changeEditor}/>
        <button
          className="btn right waves-effect waves-light"
          style={{marginTop: '20px', marginBottom: '20px'}}
          name="action"
          onClick={this.submit}>
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
