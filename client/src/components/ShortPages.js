import React, { Component } from 'react';
import {Link} from 'react-router-dom'
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
		this.deleteArticle = this.deleteArticle.bind(this)
		this.renderArticle = this.renderArticle.bind(this)
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

	deleteArticle(id) {
		this.props.deleteArticle(id)
		this.props.getMenu()
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

	renderAdd() {
		return <div className="addWrap">
				<input name="addField" value={this.state.addField} onChange={e => this.AddMnu(e)}/>
				<span className="addSave">
					<i className="material-icons" onClick={() => this.saveMnu(this.state.addField)}>save</i>
				</span>
			</div>
	}

	renderArticle(menuId) {
		return this.props.articles.map((item, index) => {
			if(menuId === item.menuId){
				return <li key={index}>
					<div className="menuLi">
						<div className="articleShort">{item.title}</div>
						<span>
							<a href={`/admin/editor/edit/${item._id}`}><i className="material-icons">edit</i></a>
							<i className="material-icons" onClick={() => this.deleteArticle(item._id)}>delete_forever</i>
						</span>
					</div>
				</li>
			}
		});
	}

	renderMenu() {
		return this.props.menu.map((item, index) =>
			<li key={index}>
				<div className="menuLi">
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
						<Link to={`admin/editor/new/${item._id}`} className="addArticle"><i className="material-icons">add</i></Link>
					</span>
				</div>
				<ul className="menuArticles">
					{this.renderArticle(item._id)}
				</ul>
			</li>);
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

function mapStateToProps({ articles, menu }) {
  return { articles, menu };
}

export default connect(mapStateToProps, actions)(ShortPages);
