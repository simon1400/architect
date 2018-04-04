import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../styles/DragDrop.css'

const SortableItem = SortableElement(({value, index, id, onDelete}) => {
  let url = value.preview ? value.preview : `/images/${id}/${value.name}`;
  return (
    <div
      className="preview"
      key={`index-${value.index}`}
      style={{backgroundImage: `url(${url})`}}
      >
        <i onMouseDown={() => onDelete(id, value)} className="far fa-times-circle"></i>
    </div>
  )
});

const SortableList = SortableContainer(({items, id, onDelete}) => {
  return <div>{items.map((value, index) => <SortableItem key={`item-${value.name}`} index={index} id={id} value={value} onDelete={onDelete} />)}</div>
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
    return <SortableList axis="xy" id={this.props.id} items={this.props.image} onSortEnd={this.onSortEnd} onDelete={this.props.onDelete} />;
  }
}

class DragDrop extends Component {

	render() {
    if(this.props.image[0] == undefined) {
      this.props.image.splice(0, 1);
    }
		return(
      <Dropzone className="dropZone" onDrop={(e) => this.props.onDrop(e)} disableClick={true}>
        <p>Try dropping some files here to upload.</p>
        <SortableComponent image={this.props.image} id={this.props.id} onShort={this.props.onShort} onDelete={this.props.deleteFoto}/>
      </Dropzone>
		)
	}
}

export default DragDrop
