import React, { Component } from 'react';
import Editor from './Editor/Editor'

class Admin extends Component {
  render() {
    return(
      <div>
        <h1>Admin</h1>
        <label htmlFor="first_name">Zahlavi</label>
        <input placeholder="Clanek 1" id="first_name" type="text" className="validate" />
        <div className="file-field input-field">
          <div className="btn">
            <span>File</span>
            <input type="file" />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <Editor />
        <div className="row" style={{clear: 'both'}}>
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" multiple />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload one or more files" />
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Admin;
