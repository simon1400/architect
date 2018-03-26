import React, { Component } from 'react';
import { Entity, RichUtils } from 'draft-js';

export default class Draft_Link extends Component {
   render() {
      const input = (
         <form className="draft__link__form dropDown__angle" onSubmit={this._handle_submit.bind(this)}>
            <input type="text" ref='url' placeholder='type or paste link here'
               onChange={this._handle_change.bind(this)} />

            <button type="submit">
               <icon className="icon-checkmark3"></icon>
            </button>

            <grip className="draft__link__close" onClick={this._close_form.bind(this)}>
               <icon className="icon-close"></icon>

            </grip>
         </form>
      )
      return (
         <div className="draft__link__wrap">
            <grip className="draft__toggle draft__link__toggle" onClick={this._show_form.bind(this)}>
               <icon className="icon icon-link"></icon>
               <div className="tooltip">
                  Make link
               </div>
            </grip>

            { this.state.showURLInput ? input : null }
         </div>
      );
   }

   constructor(props) {
      super(props);
      this.state = {
         showURLInput: false,
         urlValue: '',
      };
   }
   _show_form(event) {
      event.preventDefault();
      const { editorState } = this.props;
      const selection = editorState.getSelection();
      if (!selection.isCollapsed()) {
         this.setState({
            showURLInput: true,
            urlValue: '',
         }, () => {
            setTimeout(() => this.refs.url.focus(), 0);
         });
      }
   }
   _close_form() {
      this.setState({
         showURLInput: false,
         urlValue: '',
      });
   }
   _handle_change(event) {
      this.setState({ urlValue: event.target.value });
   }
   _handle_submit(event) {
      event.preventDefault();
      this._confirm_link();
   }
   _confirm_link() {
      this._set_link(this.state.urlValue);
      this.setState({
         showURLInput: false,
         urlValue: '',
      });
   }
   _set_link(url) {
      const { editorState } = this.props;
      const selection = editorState.getSelection();
      const contentState = editorState.getCurrentContent();
      if (url.length > 0) {
         const entityKey = Entity.create('LINK', 'MUTABLE', { url: url });
         this._toggle_link(selection, entityKey);
      }
   }
   _toggle_link(selection, entityKey) {
      this.props.onChange(RichUtils.toggleLink(this.props.editorState, selection, entityKey));
   }
}
