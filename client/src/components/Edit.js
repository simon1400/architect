import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import {stateToHTML} from 'draft-js-export-html';
import { Button } from 'reactstrap'

import Field from './Filed'
import Editor from './Editor/Editor'
import DragDrop from './DragDrop'
import '../styles/Edit.css'

class Edit extends Component {

  state = {
    title: '',
    image: [],
    uniqID: '',
    withoutLink: false,
    editorState: '',
    editorStartState: ''
  }

  componentDidMount = () => {
    if(this.props.match.params.type === 'new'){
      this.setState({
        uniqID: Math.random().toString(36).substr(2, 9),
        menuId: this.props.match.params.id,
        edit: false,
        _id: 'new'
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {type, id} = nextProps.match.params
    if(type === 'edit'){
      nextProps.articles.map(item => {
        if(item._id === id){
          this.setState({
            _id: item._id,
            uniqID: item.uniqID,
            title: item.title,
            description: item.description,
            link: item.link,
            withoutLink: item.withoutLink,
            image: item.image,
            editorStartState: item.content,
            menuId: item.menuId,
            edit: true,
          })
        }
      })
    }
  }

  changeEditor = (editorState) => {
    var newEditroState = stateToHTML(editorState.getCurrentContent())
    this.setState({editorState: newEditroState})
  }

  changeTitle = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

	onDrop = (files) => {
    this.props.saveImage(this.state.uniqID, files);
    let image = []
    files.map((file, index) => {
      return image = [
        ...image,
        {
          preview: file.preview,
          name: file.name
        }
      ]
    })
    this.setState(prevState => ({
      image: [...prevState.image, ...image]
    }))
  }

  short = image => this.setState({image})

  submit = () => {
    const content = this.state.editorState;
    const image = this.state.image;
    image.map((item, index) => {
      delete item.preview;
      item.index = index;
    })
    const data = {
      title: this.state.title,
      description: this.state.description,
      link: this.state.link,
      withoutLink: this.state.withoutLink,
      content,
      menuId: this.state.menuId,
      image: image
    }
    if(this.state.edit){
      this.props.updateArticle(this.state._id, data)
    }else{
      this.props.fetchData(this.state.uniqID, data)
    }
  }

  deleteFoto = (id, element) => {
    let image = this.state.image;
    const itemPos = image.indexOf(element);
    image.splice(itemPos, 1);
    this.setState({image})
    this.props.deleteImage(this.state._id, image, this.state.uniqID, element.name);
  }

  withoutLink = () => {
    this.setState({
      withoutLink: !this.state.withoutLink
    })
  }

	render() {
		return(
			<div>
        <h3>Edit article</h3>
        <Field name="title" title="Zahlavi" onChange={this.changeTitle} placeholder="Clanek 1" value={this.state.title} type="text" />
        <Field name="link" title="Another link" onChange={this.changeTitle} placeholder="Another link" value={this.state.link} type="text" />
        <div className="checkboxInside">
          <i className={`far ${this.state.withoutLink ? 'fa-check-square' : 'fa-square'}`} onClick={() => this.withoutLink()}></i>
        <span className="label"> - without link</span>
        </div>
        <Field name="description" title="Description" onChange={this.changeTitle} placeholder="Key words" value={this.state.description} type="text" />
        <DragDrop id={this.state.uniqID} image={this.state.image} onDrop={this.onDrop} onShort={this.short} deleteFoto={this.deleteFoto}/>
        <Editor editorStartState={this.state.editorStartState} changeEditor={this.changeEditor}/>
        <a href="/admin">
          <Button color="success" className="button_submit" onClick={this.submit}>
            Submit
          </Button>
        </a>
			</div>
		)
	}
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, actions)(Edit);
