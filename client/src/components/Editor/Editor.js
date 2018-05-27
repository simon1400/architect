import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, Modifier, CompositeDecorator } from 'draft-js';
import { Button } from 'reactstrap'

import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';

import './Editor.css'

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

const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url}>
      {props.children}
    </a>
  );
};

const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

class TextEditor extends Component {

  state = {
    showURLInput: false,
    urlValue: '',
    editorState: EditorState.createEmpty(decorator)
  }

  focus = () => this.refs.editor.focus();

  promptForLink = (e) => {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }

      this.setState({
        showURLInput: true,
        urlValue: url,
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
     var htm = stateToHTML(this.state.editorState.getCurrentContent())
    if(htm !== nextProps.editorState){
      this.setState({
        editorState: EditorState.createWithContent(stateFromHTML(nextProps.editorState))
      })
    }
  }

  confirmLink = (e) => {
    e.preventDefault();
    const {editorState} = this.state;
    const {urlValue} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: urlValue}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  onChange = (editorState) => {
    this.setState({editorState});
    this.props.changeEditor(stateToHTML(editorState.getCurrentContent()));
  }

  toggleBlock = (typeBlock) => {
    this.onChange(RichUtils.toggleBlockType(this.props.editorState, typeBlock));
  }

  toggleStyle = (typeStyle) => {
    this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, typeStyle));
  }

  clear = () => {
    const {editorState} = this.props
    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const styles = editorState.getCurrentInlineStyle()

    const removeStyles = styles.reduce((state, style) => {
      return Modifier.removeInlineStyle(state, selection, style) }, contentState)

    const removeBlock = Modifier.setBlockType(removeStyles, selection, 'unstyled')

    this.props.changeEditor(EditorState.push(
      editorState,
      removeBlock
    ))
  }

  onLinkInputKeyDown = (e) => {
    if (e.which === 13) {
      this._confirmLink(e);
    }
  }

  onURLChange = (e) => this.setState({urlValue: e.target.value});

  render(){
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        <div>
          <input
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
            />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div>;
    }
    return(
      <div className="Editor">
        <div className="button_group" style={{marginBottom: '20px'}}>
          <Button color="success" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('BOLD')}><i className="fas fa-bold"></i></Button>
          <Button color="success" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('ITALIC')}><i className="fas fa-italic"></i></Button>
          <Button color="success" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('UNDERLINE')}><i className="fas fa-underline"></i></Button>
          <Button color="success" style={{marginRight: '10px'}} onClick={e => this.toggleBlock('unordered-list-item')}><i className="fas fa-list-ul"></i></Button>
          <Button color="success" style={{marginRight: '10px'}} onClick={this.promptForLink}><i className="fas fa-link"></i></Button>
          <Button color="success" onClick={e => this.clear()}><i className="fas fa-times"></i></Button>
        </div>
        {urlInput}
        <Editor
          editorState={this.state.editorState}
          onChange={(e) => this.onChange(e)}
          ref="editor"
        />
      </div>
    )
  }
}

export default TextEditor;
