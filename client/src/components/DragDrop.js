import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Sortable from 'react-anything-sortable/src'
import { SortableContainer } from 'react-anything-sortable';

import '../styles/DragDrop.css'
import 'react-anything-sortable/sortable.css';

class SortableItem extends Component {
  render() {
    return (
      <SortableContainer>
        <div>
          your item {this.props.shortData}
        </div>
      </SortableContainer>
    )
  }
}

class DragDrop extends Component {

  // prewiewPhoto() {
  //   return this.props.preview.map((link, index) => <SortableContainer shortData={index}><div className="preview" style={{backgroundImage: `url(${link})`}}></div></SortableContainer>)
  // }

	render() {
		return(
      <Dropzone
        style={{width: '100%', minHeight: '200px', border: '2px dashed grey', borderRadius: '5px', padding: '20px', marginBottom: '40px'}}
        onDrop={(e) => this.props.onDrop(e)}
        disableClick={true}>
        <p>Try dropping some files here, or click to select files to upload.</p>
        <Sortable containment>
          <SortableItem shortData="1"/>
          <SortableItem shortData="2"/>
        </Sortable>
      </Dropzone>
		)
	}
}

export default DragDrop
