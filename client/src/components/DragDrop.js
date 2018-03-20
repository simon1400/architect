import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../styles/DragDrop.css'

const SortableItem = SortableElement(({value}) =>
  <div className="preview" style={{backgroundImage: `url(${value.preview})`}}></div>
);

const SortableList = SortableContainer(({items}) => {
  return <div>{items.map((value, index) => <SortableItem key={`item-${index}`} index={index} value={value} />)}</div>
});

class SortableComponent extends Component {

  state = {
    items: []
  };

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.props.image, oldIndex, newIndex),

    });
    this.props.onShort(this.state.items)
  };

  render() {
    return <SortableList axis="xy" items={this.props.image} onSortEnd={this.onSortEnd} />;
  }
}

class DragDrop extends Component {

	render() {
		return(
      <Dropzone className="dropZone" onDrop={(e) => this.props.onDrop(e)} disableClick={true}>
        <p>Try dropping some files here, or click to select files to upload.</p>
        <SortableComponent image={this.props.image} onShort={this.props.onShort}/>
      </Dropzone>
		)
	}
}

export default DragDrop
