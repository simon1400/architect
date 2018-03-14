import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../actions';

import '../styles/DragDrop.css'

class DragDrop extends Component {

  state = {
    files: [],
    preview: []
  }

  prewiewPhoto() {
    return this.state.preview.map(link => <div key={link} className="preview" style={{backgroundImage: `url(${link})`}}></div>);
  }

  onDrop(files) {
    files.map(file =>
      this.setState(prevState => ({
        files: [...prevState.files, file],
        preview: [...prevState.preview, file.preview]
      }))
    )
  }

  sendPhoto() {

    let data = new FormData();
    for (var i = 0; i < this.state.files.length; i++) {
      let file = this.state.files[i];
      data.append('file', file);
    }
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    this.props.fetchImage(data, config);
  }

	render() {
		return(
      <div>
        <button className="btn flat" style={{marginBottom: '20px'}} onClick={this.sendPhoto.bind(this)}>Send</button>
        <Dropzone
          style={{width: '100%', minHeight: '200px', border: '2px dashed grey', borderRadius: '5px', padding: '20px', marginBottom: '40px'}}
          onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
          {this.prewiewPhoto()}
        </Dropzone>
      </div>

		)
	}
}

function mapStateToProps({ image }) {
  return { image };
}

export default connect(mapStateToProps, actions)(DragDrop)
