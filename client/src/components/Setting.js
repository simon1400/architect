import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap'
import Dropzone from 'react-dropzone';

import '../styles/setting.css'

class Setting extends Component {

  state = {
    themeColor: '',
    favicon: 'https://storage.googleapis.com/favicon_image/favicon.ico',
    description: '',
    title: '',
    namePage: ''
  }

  componentWillReceiveProps = (nextProps) => {
		this.setState({
      themeColor: nextProps.setting[0].themeColor,
      description: nextProps.setting[0].description,
      title: nextProps.setting[0].title,
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDrop = (file) => {
    this.props.saveImage('favicon_image', file);
    this.setState({favicon: file[0].preview})
  }

  componentDidMount = () => {
    this.props.getSettings();
  }

  render() {
    return(
      <div className="setting">
        <h1>Settings</h1>
        <div className="setting_row theme-color">
          <label>Theme color</label><br/>
          <input name="themeColor" value={this.state.themeColor} onChange={(e) => this.onChange(e)} type="text" placeholder="Teheme color..." />
        <Button color="success" onClick={() => this.props.setSetting('themeColor', this.state.themeColor)}>Save</Button>
        </div>
        <label>Favicon</label>
        <Dropzone onDrop={(e) => this.onDrop(e)}>
          <p>Try dropping favicon file here to upload.</p>
          <div className="faviconPreview"><img src={this.state.favicon} alt="Favicon" /></div>
        </Dropzone>
        <div className="setting_row"></div>
        <div className="setting_row description">
          <label>Description</label><br/>
          <input name="description" value={this.state.description} onChange={(e) => this.onChange(e)} type="text" placeholder="Description..." />
          <Button color="success" onClick={() => this.props.setSetting('description', this.state.description)}>Save</Button>
        </div>
        <div className="setting_row title">
          <label>Title</label><br/>
          <input name="title" value={this.state.title} onChange={(e) => this.onChange(e)} type="text" placeholder="Title..." />
          <Button color="success" onClick={() => this.props.setSetting('title', this.state.title)}>Save</Button>
        </div>
        <div className="setting_row title">
          <label>Name page</label><br/>
          <input name="namePage" value={this.state.namePage} onChange={(e) => this.onChange(e)} type="text" placeholder="Name page..." />
          <Button color="success" onClick={() => this.props.setSetting('namePage', this.state.namePage)}>Save</Button>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ setting }) {
  return { setting };
}

export default connect(mapStateToProps, actions)(Setting);
