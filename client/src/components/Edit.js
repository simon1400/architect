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
    files: [],
    preview: [],
    namesImage: [],
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
    files.map(file =>
      this.setState(prevState => ({
        files: [...prevState.files, file],
        preview: [...prevState.preview, file.preview],
        namesImage: [...prevState.namesImage, file.name]
      }))
    )
  }

  submit = () => {
    const content = stateToHTML(this.state.editorState.getCurrentContent());
    const data = {
      title: this.state.title,
      content,
      namesImage: this.state.namesImage
    }
    this.props.fetchData(this.state.uniqID, data, this.state.files)
  }

	render() {
		return(
			<div>
				<label htmlFor="first_name">Zahlavi</label>
        <input placeholder="Clanek 1" name="title" onChange={(e) => this.changeTitle(e)} type="text" value={this.state.title} />
				<DragDrop {...this.state} onDrop={this.onDrop}/>
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
