import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import DragSortableList from 'react-drag-sortable'

import '../styles/DragDrop.css'

const placeholder = (
    <div className="placeholderContent">PLACEHOLDER</div>
);

const onSort = function(sortedList, dropEvent) {
    console.log("sortedList", sortedList, dropEvent);
 }

class DragDrop extends Component {

  // <DragSortableList items={photo} placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="vertical"/>

  prewiewPhoto() {
    const photo = this.props.preview.map(link => <div key={link} className="preview" style={{backgroundImage: `url(${link})`}}></div>)
    return <DragSortableList items={photo} placeholder={placeholder} onSort={onSort} dropBackTransitionDuration={0.3} type="horizontal"/>
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
