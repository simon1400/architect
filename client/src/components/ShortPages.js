import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Button } from 'reactstrap'

import '../styles/SortPages.css'

class ShortPages extends Component {

	constructor(props) {
		super(props)
		this.state = {
			addMenu: false,
			addField: '',
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

	onClickMnu(e, value) {
		this.setState({
		[e]: {
			disable: false,
			value: value
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
					<i className="fas fa-save" onClick={() => this.saveMnu(this.state.addField)}></i>
				</span>
			</div>
	}

	column(id, column) {
		this.props.updateArticleColumn(id, !column)
	}

	renderArticle(menuId) {
		return this.props.articles.map((item, index) => {
			if(menuId === item.menuId){
				return <li key={index}>
					<div className="menuLi">
						<div className="articleShort">{item.title}</div>
						<span className="icons">
							<i className={`far ${item.column ? 'fa-check-square' : 'fa-square'}`} onClick={() => this.column(item._id, item.column)}></i>
							<a href={`/admin/editor/edit/${item._id}`}><i className="far fa-edit"></i></a>
							<i className="far fa-trash-alt" onClick={() => this.deleteArticle(item._id)}></i>
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
					<span className="icons">
						<i className={this.state[item._id] ? this.state[item._id].disable ? "hide" : 'fas fa-save' : "hide"} onClick={() => this.saveMnu(this.state[item._id].value, item._id)}></i>
						<i className="far fa-edit" onClick={() => this.onClickMnu(item._id, item.name)}></i>
						<i className="far fa-trash-alt" onClick={() => this.deleteData(item._id)}></i>
						<Link to={`admin/editor/new/${item._id}`} className="addArticle"><i className="fas fa-plus"></i></Link>
					</span>
					<ul className="menuArticles">
						{this.renderArticle(item._id)}
					</ul>
				</div>
			</li>);
	}

	render() {
		return(
			<div className="shortPages">
				<h3>Short Pages</h3>
			<Button color="success" className="addBtn" onClick={this.AddMnu}>{this.state.addMenu ? 'Hide' : 'Add'}</Button>
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
