import React, { Component } from 'react';
import { Editor, RichUtils } from 'draft-js';

import './Editor.css'

class TextEditor extends Component {

  constructor(props){
    super(props)

    this.onChange = this.onChange.bind(this)
    this.toggleBlock = this.toggleBlock.bind(this)
    this.toggleStyle = this.toggleStyle.bind(this)
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

  render(){
    return(
      <div>
        <div className="button_group" style={{marginBottom: '20px'}}>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('BOLD')}><i className="material-icons center">format_bold</i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('ITALIC')}><i className="material-icons center">format_italic</i></button>
          <button className="waves-effect waves-light btn" style={{marginRight: '10px'}} onClick={e => this.toggleStyle('UNDERLINE')}><i className="material-icons center">format_underlined</i></button>
          <button className="waves-effect waves-light btn" onClick={e => this.toggleBlock('unordered-list-item')}><i className="material-icons center">format_list_bulleted</i></button>
        </div>
        <Editor
          editorState={this.props.editorState}
          onChange={(e) => this.onChange(e)}/>
      </div>
    )
  }
}

export default TextEditor;
