import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import '../styles/DragDrop.css'

const SortableItem = SortableElement(({value, indexOf, id, onDelete}) => {
  let url = value.preview ? value.preview : `/images/${id}/${value.name}`;
  return (
    <div
      className="preview"
      key={`index-${indexOf}`}
      style={{backgroundImage: `url(${url})`}}
      >
        <i onMouseDown={() => onDelete(id, value)} className="far fa-times-circle"></i>
    </div>
  )
});

const SortableList = SortableContainer(({items, id, onDelete}) => {
  return <div>{items.map((value, index) => <SortableItem key={`item-${index}`} index={index} id={id} indexOf={index} value={value} onDelete={onDelete} />)}</div>
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
    this.props.image.map(item => {
      if(item == undefined) {
        this.props.image.splice(this.props.image.indexOf(item), 1);
      }
    })

		return(
      <Dropzone className="dropZone" onDrop={(e) => this.props.onDrop(e)} disableClick={true}>
        <p>Try dropping some files here to upload.</p>
        <SortableComponent image={this.props.image} id={this.props.id} onShort={this.props.onShort} onDelete={this.props.deleteFoto}/>
      </Dropzone>
		)
	}
}

export default DragDrop
