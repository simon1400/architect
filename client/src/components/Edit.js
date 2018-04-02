import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { EditorState, CompositeDecorator } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

import Field from './Filed'
import Editor from './Editor/Editor'
import DragDrop from './DragDrop'
import '../styles/Edit.css'

function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}

const Links = (props) => {
  const { url } = props.contentState
    .getEntity(props.entityKey).getData();

  return (
    <a href={url} title={url} className="ed-link">
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Links
  }
]);

class Edit extends Component {

  state = {
    title: '',
    image: [],
    uniqID: '',
    editorState: EditorState.createEmpty(decorator)
  }

  componentDidMount = () => {
    if(this.props.match.params.type === 'new'){
      this.setState({
        uniqID: Math.random().toString(36).substr(2, 9),
        menuId: this.props.match.params.id,
        edit: false
      })
    }
  }

  componentWillReceiveProps = (nextProps) => {
    const {type, id} = nextProps.match.params
    if(this.props.match.params.type == 'edit'){
      nextProps.articles.map(item => {
        if(item._id === id){
          this.setState({
            _id: item._id,
            uniqID: item.uniqID,
            title: item.title,
            image: item.image,
            editorState: EditorState.createWithContent(stateFromHTML(item.content)),
            menuId: item.menuId,
            edit: true,
          })
        }
      })
    }
  }

  changeEditor = (editorState) => {
    this.setState({editorState: editorState})
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
    const content = stateToHTML(this.state.editorState.getCurrentContent());
    const image = this.state.image;
    image.map((item, index) => {
      delete item.preview;
      item.index = index;
    })
    const data = {
      title: this.state.title,
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

	render() {
		return(
			<div>
        <h3>Edit article</h3>
        <Field name="title" title="Zahlavi" onChange={this.changeTitle} placeholder="Clanek 1" value={this.state.title} type="text" />
        <DragDrop id={this.state.uniqID} image={this.state.image} onDrop={this.onDrop} onShort={this.short}/>
        <Editor editorState={this.state.editorState} changeEditor={this.changeEditor}/>
        <a href="/admin">
          <button className="btn right waves-effect waves-light button_submit" onClick={this.submit}>
            Submit
          </button>
        </a>
			</div>
		)
	}
}

function mapStateToProps({ articles }) {
  return { articles };
}

export default connect(mapStateToProps, actions)(Edit);
