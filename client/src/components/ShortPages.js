import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/SortPages.css'

class ShortPages extends Component {

	constructor(props) {
		super(props)
		this.state = {
			addMenu: false,
			addField: ''
		}

		this.AddMnu = this.AddMnu.bind(this)
		this.onChangeMnu = this.onChangeMnu.bind(this)
		this.onClickMnu = this.onClickMnu.bind(this)
		this.deleteData = this.deleteData.bind(this)
	}

	componentDidMount() {
		this.props.getMenu()
	}

	onClickMnu(e) {
		this.setState({
		[e]: {
			disable: false
		}})
	}

	onChangeMnu(e) {
		this.setState({
			[e.target.name]: {
				value: e.target.value
		}})
	}

	deleteData(id) {
		delete this.state[id]
		this.props.deleteMenu(id)
		this.props.getMenu()
	}

	renderAdd() {
		return <div className="addWrap">
				<input name="addField" value={this.state.addField} onChange={e => this.AddMnu(e)}/>
				<span className="addSave">
					<i className="material-icons" onClick={() => this.saveMnu(this.state.addField)}>save</i>
				</span>
			</div>
	}

	renderMenu() {
		return this.props.menu.map((item, index) =>
			<li key={item._id}>
				<input
					name={item._id}
					value={this.state[item._id] ? this.state[item._id].value : item.name}
					onChange={e => this.onChangeMnu(e)}
					disabled={this.state[item._id] ? this.state[item._id].disable : true}
				/>
				<span>
					<i className={this.state[item._id] ? this.state[item._id].disable ? "hide" : "material-icons" : "hide"} onClick={() => this.saveMnu(this.state[item._id].value, item._id)}>save</i>
					<i className="material-icons" onClick={() => this.onClickMnu(item._id)}>edit</i>
					<i className="material-icons" onClick={() => this.deleteData(item._id)}>delete_forever</i>
					<i className="material-icons" onClick={() => this.deleteData(item._id)}>add</i>
				</span>
			</li>)
	}

	AddMnu(e) {
		e.target.name ? this.setState({
			addField: e.target.value
		}) : this.setState({addMenu: !this.state.addMenu})
	}

	saveMnu(menu, id) {
		delete this.state[id]
		this.props.addMenu(menu, id)
		this.props.getMenu();
		this.setState({
			[id]: {
				disable: true
			},
			addField: '',
			addMenu: false
		})
	}

	render() {
		return(
			<div>
				<h3>Short Pages</h3>
				<button className="btn flat right" onClick={this.AddMnu}>{this.state.addMenu ? 'Hide' : 'Add'}</button>
				<div style={{clear: 'both'}}></div>
				{this.state.addMenu ? this.renderAdd() : ''}
				<ul>
					{this.renderMenu()}
				</ul>
			</div>
		)
	}
}

function mapStateToProps({ article, menu }) {
  return { article, menu };
}

export default connect(mapStateToProps, actions)(ShortPages);
