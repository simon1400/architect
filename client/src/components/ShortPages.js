import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMenu } from '../actions';

import Filed from './Filed'

class ShortPages extends Component {

	constructor(props) {
		super(props)
		this.state = {
			addMenu: false,
			name: ''
		}

		this.AddBtn = this.AddBtn.bind(this);
	}


	onChangeMnu(e) {
		this.setState({
			name: e
		})
	}

	renderArticle() {
		return(
			<div className="collection">
				{/* {this.props.projects.map((item, index) =>
					<a href="#!" key={index} className="collection-item">{item.title}</a>)} */}
			</div>
		)
	}

	AddBtn() {
		this.props.addMenu('menu1')
	}

	render() {
		return(
			<div>
				<h3>Short Pages</h3>
				<button className="btn flat right" onClick={this.AddBtn}>Add</button>
				<div style={{clear: 'both'}}></div>
				{/* <Field name="menu" title="Add menu" onChange={this.onChangeMnu} placeholder="Menu 1" value={this.state.name} type="text" />} */}
				{this.renderArticle()}
			</div>
		)
	}
}

function mapStateToProps({ menu }) {
  return { menu };
}

export default connect(mapStateToProps, {addMenu})(ShortPages);
