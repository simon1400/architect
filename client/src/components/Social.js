import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/SocialIcons.css'

class Social extends Component {

  state = {
    addSocial: false,
		nameSocial: '',
		nameClass: '',
		link: ''
  }


	componentDidMount = () => {
		this.props.getSocial()
	}

	changeInp = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	AddSocial = () => {
		this.setState({
			addSocial: !this.state.addSocial
		})
	}

	save = () => {
		this.props.saveSocial(this.state.nameSocial, this.state.nameClass, this.state.link)
		this.AddSocial();
	}

	deleteData(id) {
		this.props.deleteSocial(id)
	}


	renderAdd = () => {
		return (
			<div className="addIcons row">
				<div className="col s3"><input className="inp_icon" name="nameSocial" value={this.state.nameSocial} placeholder="Name social" onChange={e => this.changeInp(e)} /></div>
				<div className="col s4"><input className="inp_icon" name="nameClass" value={this.state.nameClass} placeholder="Class-name icon" onChange={e => this.changeInp(e)} /></div>
				<div className="col s4"><input className="inp_icon" name="link" value={this.state.link} placeholder="Social link" onChange={e => this.changeInp(e)} /></div>
			<div className="col s1"><span className="icons"><i className="fas fa-save" onClick={this.save}></i></span></div>
			</div>
		)
	}

	renderSocial = () => this.props.social.map((social, index) =>
		<div className="row item_social" key={index}>
			<div className="col s2"><i className={social.classname}></i><span>{social.name}</span></div>
			<div className="col s4"><span>{social.classname}</span></div>
			<div className="col s4"><span>{social.link}</span></div>
			<div className="col s2">
				<span className="controllButtons">
					<i className="far fa-edit"></i>
					<i className="far fa-trash-alt" onClick={() => this.deleteData(social._id)}></i>
				</span>
			</div>
		</div>
	)

  render() {
    return(
      <div>
				<h3>Social buttons</h3>
        <button className="btn flat right" onClick={this.AddSocial}>{this.state.addSocial ? 'Hide' : 'Add'}</button>
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
