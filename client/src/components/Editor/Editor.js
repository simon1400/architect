import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { connect } from 'react-redux';
import { submitContent } from '../../actions';

import './Editor.css'

class TextEditor extends Component {

  state = {editorState: EditorState.createEmpty()}
  onChange = (editorState) => this.setState({editorState});

  toggleBlock = (typeBlock) => this.onChange(RichUtils.toggleBlockType(this.state.editorState, typeBlock));
  toggleStyle = (typeStyle) => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, typeStyle));

  submitEditor = () => {
    const content = stateToHTML(this.state.editorState.getCurrentContent());
    this.props.submitContent(content);
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
          editorState={this.state.editorState}
          onChange={this.onChange}/>
        <button
          className="btn right waves-effect waves-light"
          style={{marginTop: '20px', marginBottom: '20px'}}
          name="action"
          onClick={e => this.submitEditor()}>
          Submit
          <i className="material-icons right">send</i>
        </button>
      </div>
    )
  }
}

function mapStateToProps({ project }) {
  return { project };
}

export default connect(mapStateToProps, {submitContent})(TextEditor);
