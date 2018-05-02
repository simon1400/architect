import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Button } from 'reactstrap'
import Dropzone from 'react-dropzone';

import '../styles/setting.css'

class Setting extends Component {

  state = {
    themeColor: '',
    favicon: ''
  }

  componentWillReceiveProps = (nextProps) => {
		this.setState({
      themeColor: nextProps.setting[0].themeColor,
      favicon: nextProps.setting[0].favicon
    })
  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onDrop = (file) => {
    this.props.saveImage('favicon_image', [file]);
    this.setState({favicon: file.preview})
  }

  render() {
    return(
      <div className="setting">
        <h1>Settings</h1>
        <div className="setting_row theme-color">
          <label>Theme color</label><br/>
          <input name="themeColor" value={this.state.themeColor} onChange={(e) => this.onChange(e)} type="text" placeholder="Teheme color..." />
          <Button color="success" onClick={() => this.props.themeColor(this.state.themeColor)}>Save</Button>
        </div>
        <label>Favicon</label>
        <Dropzone onDrop={(e) => this.onDrop(e)}>
          <p>Try dropping favicon file here to upload.</p>
          <img src={this.state.favicon} />
        </Dropzone>
      </div>
    )
  }
}

function mapStateToProps({ setting }) {
  return { setting };
}

export default connect(mapStateToProps, actions)(Setting);
