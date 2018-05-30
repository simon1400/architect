import React, { Component } from 'react';
import Editor, { createEditorStateWithText } from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import { ItalicButton, BoldButton, UnderlineButton } from 'draft-js-buttons';
import { Button } from 'reactstrap'

import './Editor.css'

const linkPlugin = createLinkPlugin();
const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    linkPlugin.LinkButton
  ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];
const text = 'Try selecting a part of this text and click on the link button in the toolbar that appears …';

class TextEditor extends Component {

  focus = () =>
    this.editor.focus();

  onChange = (editorState) => {
    this.props.changeEditor(editorState);
  }

  render(){
    return(
      <div className="Editor" onClick={this.focus}>
        <Editor
          editorState={this.props.editorState}
          onChange={(e) => this.onChange(e)}
          plugins={plugins}
          ref={(element) => { this.editor = element; }}
        />
        <InlineToolbar />
      </div>
    )
  }
}

export default TextEditor;
