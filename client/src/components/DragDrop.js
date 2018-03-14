import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import '../styles/DragDrop.css'

class DragDrop extends Component {

  prewiewPhoto() {
    return this.props.preview.map(link => <div key={link} className="preview" style={{backgroundImage: `url(${link})`}}></div>);
  }

	render() {
		return(
      <Dropzone
        style={{width: '100%', minHeight: '200px', border: '2px dashed grey', borderRadius: '5px', padding: '20px', marginBottom: '40px'}}
        onDrop={(e) => this.props.onDrop(e)}>
        <p>Try dropping some files here, or click to select files to upload.</p>
        {this.prewiewPhoto()}
      </Dropzone>
		)
	}
}

export default DragDrop

{/* <button className="btn flat" style={{marginBottom: '20px'}} onClick={() => this.props.fetchImage(this.props.files)}>Send</button> */}
