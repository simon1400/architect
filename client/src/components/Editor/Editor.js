import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import { EditorState, ContentState, Modifier, getContentStateFragment } from 'draft-js';
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
import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

import 'draft-js-inline-toolbar-plugin/lib/plugin.css';
import 'draft-js-anchor-plugin/lib/plugin.css';
import './Editor.css'

class HeadlinesPicker extends Component {

  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () => this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => <Button key={i} {...this.props} /> )}
      </div>
    );
  }
}

class HeadlinesButton extends Component {

  onMouseDown = (event) => event.preventDefault()

  onClick = () => this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">H</button>
      </div>
    );
  }
}

class Clear extends Component {

  onMouseDown = (event) => event.preventDefault()

  onClick = () => {
    const editorState = this.props.getEditorState()
    const selection = editorState.getSelection()
    const contentState = editorState.getCurrentContent()
    const plainText = contentState.getPlainText()
    const styles = editorState.getCurrentInlineStyle()

    // const removeStyles = styles.reduce((state, style) => {
    //   return Modifier.removeInlineStyle(state, selection, style) }, contentState)
    //
    // const removeBlock = Modifier.setBlockType(removeStyles, selection, 'unstyled')

    this.props.setEditorState(EditorState.createWithContent(stateFromHTML(plainText)))

    // this.props.setEditorState(EditorState.push(
    //   editorState,
    //   plainText
    // ))
  }

  render() {
    return (
      <div onMouseDown={this.onMouseDown} className="headlineButtonWrapper">
        <button onClick={this.onClick} className="headlineButton">C</button>
      </div>
    );
  }
}

const linkPlugin = createLinkPlugin();

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
    CodeBlockButton,
    Clear
  ]
});

const { InlineToolbar } = inlineToolbarPlugin;
const plugins = [inlineToolbarPlugin, linkPlugin];

class TextEditor extends Component {

  state = {
    editorState: EditorState.createEmpty(),
    startState: 1
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.editorStartState && this.state.startState){
      this.setState({
        editorState: EditorState.push(this.state.editorState, stateFromHTML(nextProps.editorStartState)),
        startState: 0
      })
    }
  }

  focus = () => this.editor.focus();

  onChange = (editorState) => {
    this.setState({ editorState })
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
