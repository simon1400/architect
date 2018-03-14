import React, { Component } from 'react';
import Editor from './Editor/Editor'
import DragDrop from './DragDrop'


class Edit extends Component {

	handleChange(event) {
    const target = event.target.files;
    console.log(target)
	}

	render() {
		return(
			<div>
				<label htmlFor="first_name">Zahlavi</label>
        <input placeholder="Clanek 1" id="first_name" type="text" className="validate" />
				<DragDrop />
        <Editor />
			</div>
		)
	}
}

export default Edit;
