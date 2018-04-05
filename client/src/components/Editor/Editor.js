import React, { Component } from 'react';
import { EditorState, Editor, RichUtils, Modifier } from 'draft-js';

import './Editor.css'

class TextEditor extends Component {

  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.toggleBlock = this.toggleBlock.bind(this)
    this.toggleStyle = this.toggleStyle.bind(this)
    this.setLink = this.setLink.bind(this)
    this.clear = this.clear.bind(this)
  }

  onChange(editorState){
    this.props.changeEditor(editorState);
  }

  toggleBlock(typeBlock){
     this.onChange(RichUtils.toggleBlockType(this.props.editorState, typeBlock));
   }
  toggleStyle(typeStyle){
     this.onChange(RichUtils.toggleInlineStyle(this.props.editorState, typeStyle));
   }

   clear() {
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


   setLink() {
      // получаем ссылку из prompt диалога
      const urlValue = prompt('Введите ссылку', '');
      // получаем текущий editorState
      const { editorState } = this.props;
      // получаем текущий contentState
      const contentState = editorState.getCurrentContent();
      // создаем Entity
      const contentStateWithEntity = contentState.createEntity(
        'LINK',
        'SEGMENTED',
        { url: urlValue }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      // обновляем свойство currentContent у editorState
      const newEditorState = EditorState.set(editorState, {currentContent: contentStateWithEntity});

      // с помощью метода toggleLink из RichUtils генерируем новый
      // editorState и обновляем стейт
      this.props.changeEditor(RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ), () => {
        setTimeout(() => this.focus(), 0);
      });
    }

  render(){
    return(
      <div className="Editor">
        <div className="button_group" style={{marginBottom: '20px'}}>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('BOLD')}><i className="fas fa-bold"></i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('ITALIC')}><i className="fas fa-italic"></i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('UNDERLINE')}><i className="fas fa-underline"></i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleBlock('unordered-list-item')}><i className="fas fa-list-ul"></i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.setLink()}><i className="fas fa-link"></i></button>
          <button className="waves-effect waves-light btn" onClick={e => this.clear()}><i className="fas fa-times"></i></button>
        </div>
        <Editor
          editorState={this.props.editorState}
          onChange={(e) => this.onChange(e)}/>
      </div>
    )
  }
}

export default TextEditor;
