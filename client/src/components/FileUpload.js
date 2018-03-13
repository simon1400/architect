import React, { Component } from 'react';

class FileUpload extends Component {
	render() {
		return(
			<div className="file-field input-field">
	      <div className="btn">
	        <span>File</span>
	        <input type="file" />
	      </div>
	      <div className="file-path-wrapper">
	        <input className="file-path validate" type="text" />
	      </div>
	    </div>
		)
	}
}

export default FileUpload