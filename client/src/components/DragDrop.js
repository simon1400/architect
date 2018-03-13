import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import * as actions from '../actions';

class DragDrop extends Component {

  state = {
    files: [],
    preview: ''
  }


  prewiewPhoto() {

  }

  onDrop(files) {
    this.setState({
      files: files[0],
      preview: files[0].preview
    })
    console.log(files)
    var file = files[0];
    var file_type = file.type;
    file_type = file_type.split('/')[1];
    var new_filename = 'manefile.' + file_type;
    var data = new FormData();
    data.append('file', file, new_filename);
    this.props.fetchImage(data);
  }

	render() {
    let url = `${this.state.preview}`

		return(
      <div>
        <Dropzone onDrop={this.onDrop.bind(this)}>
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>
        <div style={{width: '200px', height: '200px', backgroundImage: `url(${this.state.preview})`}}></div>
      </div>

		)
	}
}

function mapStateToProps({ image }) {
  return { image };
}

export default connect(mapStateToProps, actions)(DragDrop)
