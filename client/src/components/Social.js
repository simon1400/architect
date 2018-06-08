import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'reactstrap'
import Dropzone from 'react-dropzone';

import '../styles/SocialIcons.css'

class Social extends Component {

  state = {
    addSocial: false,
		link: '',
    uniqID: '',
    iconSet: ''
  }


	componentDidMount = () => {
		this.props.getSocial();
	}

	changeInp = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	AddSocial = () => {
		this.setState({
      uniqID: Math.random().toString(36).substr(2, 9),
			addSocial: !this.state.addSocial
		})
	}

	save = () => {
    var fullUrl = this.state.uniqID + '/' + this.state.iconSet;
		this.props.saveSocial(fullUrl, this.state.link)
		this.AddSocial();
	}

	deleteData(id) {
		this.props.deleteSocial(id)
	}

  onDrop = (files) => {
    this.props.saveImage(this.state.uniqID, files);
    this.setState({
      iconSet: files[0].name,
      preview: files[0].preview
    })
  }

	renderAdd = () => {
		return (
			<div className="addIcons addSocial row">
				<div className="col s5">
          <Dropzone className="dropSocial" onDrop={(e) => this.onDrop(e)}>
            {this.state.preview ? <div className="faviconPreview"><img src={this.state.preview} alt="Preview icon" /></div> : <p>Upload social icon</p>}
          </Dropzone>
        </div>
				<div className="col s5"><input className="inp_icon" name="link" value={this.state.link} placeholder="Social link" onChange={e => this.changeInp(e)} /></div>
			  <div className="col s2"><span className="icons"><i className="fas fa-save" onClick={this.save}></i></span></div>
			</div>
		)
	}

	renderSocial = () => this.props.social.map((social, index) =>
		<div className="row" key={index}>
      <div className="col s12">
        <div className="item_social">
          <div className="row">
      			<div className="col s5"><img src={`https://storage.googleapis.com/${social.image}`} alt={`Icon ${index}`} /></div>
      			<div className="col s5"><span>{social.link}</span></div>
      			<div className="col s2">
      				<span className="controllButtons">
      					<i className="far fa-edit"></i>
      					<i className="far fa-trash-alt" onClick={() => this.deleteData(social._id)}></i>
      				</span>
      			</div>
          </div>
        </div>
      </div>
		</div>
	)

  render() {
    return(
      <div>
				<h3>Social buttons</h3>
				<Button color="success" className="addBtn" onClick={this.AddSocial}>{this.state.addSocial ? 'Hide' : 'Add'}</Button>
				<div style={{clear: 'both'}}></div>
				{this.state.addSocial ? this.renderAdd() : ''}
				{this.renderSocial()}
			</div>
    )
  }
}

function mapStateToProps({ social }) {
  return { social };
}

export default connect(mapStateToProps, actions)(Social);
