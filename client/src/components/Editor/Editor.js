import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState } from 'draft-js';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import createLinkPlugin from 'draft-js-anchor-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons';

import { Button } from 'reactstrap'

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';

import './Editor.css'

const linkPlugin = createLinkPlugin();

class HeadlinesPicker extends Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {
  // When using a click event inside overridden content, mouse down
  // events needs to be prevented so the focus stays in the editor
  // and the toolbar remains visible  onMouseDown = (event) => event.preventDefault()
  onMouseDown = (event) => event.preventDefault()

  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">
          H
        </button>
      </div>
    );
  }
}

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    linkPlugin.LinkButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];

class TextEditor extends Component {
  //
  state = {
    editorState: EditorState.createEmpty()
  }

  focus = () => this.editor.focus();

  onChange = (editorState) => {
    this.setState({
      editorState
    })
    this.props.changeEditor(editorState);
  }

  render(){
    return(
      <div className="editor" onClick={this.focus}>
        <Editor
          editorState={this.state.editorState}
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
