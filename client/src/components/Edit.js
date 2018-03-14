import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Editor from './Editor/Editor'
import DragDrop from './DragDrop'

class Edit extends Component {

  state = {
    files: [],
    preview: [],
    nameImage: []
  }

	onDrop(files) {
    files.map(file =>
      this.setState(prevState => ({
        files: [...prevState.files, file],
        preview: [...prevState.preview, file.preview],
        nameImage: [...prevState.nameImage, file.name]
      }))
    )
  }

	render() {
		return(
			<div>
				<label htmlFor="first_name">Zahlavi</label>
        <input placeholder="Clanek 1" id="first_name" type="text" className="validate" />
				<DragDrop {...this.state} onDrop={this.onDrop}/>
        <Editor />
			</div>
		)
	}
}

function mapStateToProps({ edit }) {
  return { edit };
}

export default connect(mapStateToProps, actions)(Edit);
